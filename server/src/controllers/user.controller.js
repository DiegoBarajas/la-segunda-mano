const UserModel = require('../models/user.model');
const PreUserModel = require('../models/preUser.model');

const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

const UncompleteFieldsError = require('../errors/UncompleteFieldsError');
const CustomError = require('../errors/CustomError');
const mailer = require('../mailer');
const preUserModel = require('../models/preUser.model');

require('dotenv').config();
const controller = {};

/* Obtener informacion del usuario desde el token */
controller.getUser = async(req, res, next) => {
    try{
//      Obtener el user desde el AuthMiddleware
        const user = req.user;

//      Retornar la data importante
        res.json({
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            estado: user.estado,
            foto: user.foto,
            sellerId: user.sellerId,
            type: user.type
        });
        
    }catch(err){
        next(err);
    }
}

/* Iniciar sesion */
controller.login = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { correo, contraseña } = req.body;
        if(!correo || !contraseña) throw new UncompleteFieldsError(["correo", "contraseña"]);

//      Comprobar si existe el usuario con el correo
        const user = await UserModel.findOne({ correo });
        if(!user) throw new CustomError(`No hay ninguna cuenta asociada a ese correo.`, 400);

//      Comprobar si la contraseña coincide
        if(!bcrypt.compareSync(contraseña, user.contraseña)){
            throw new CustomError(`La contraseña es invalida.`, 401);
        }

//      Generate JWT
        const token = jwt.sign({user}, process.env.JWT_SECRET, { expiresIn: '1y' });

//      Formatear usuario para la respuesta
        const respUser = {
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            estado: user.estado,
            foto: user.foto,
            sellerId: user.sellerId
        }

//      Enviar respuesta
        res.send({token, user: respUser});
    }catch(err){
        next(err);
    }
}

/* Actualizar datos */
controller.updateUser = async(req, res, next) => {
    try{
//      Obtener la data del req (el body, usuario autenticado y archivos)
        const { user, body } = req;
        const { nombre, apellido, estado, password, eliminarFoto } = body;
        const files = req.files;

//      Crear el objeto a actualizar
        const datos = { nombre, apellido }

        datos.estado = estado == '*' ? null : estado;

//      Si se mando a eliminar la imagen:
        if(eliminarFoto === 'true'){
            datos.foto = null;
//          Eliminar la imagen con cloudinary
            await cloudinary.uploader.destroy(user._id.toString());
        }

//      Si se mando una contraseña:
        if(password){
            datos.contraseña = bcrypt.hashSync(password, 8);
        }

//      Si se mando una imagen:
        if(files){
//          Obtener el key "foto" en las imagenes                
            const { foto } = files;

//          Si encuentra la foto
            if(foto){
//              Almacenarla con cloudinary en la carpeta "users"
                const result = await cloudinary.uploader.upload(foto.tempFilePath, {
                    folder: 'Users',
                    resource_type: 'auto',
                    public_id: user._id,
                    overwrite: true,
                    width: 250,
                    height: 250,
                    crop: 'thumb'
                });

//              Eliminar el archivo temporal
                fs.rmSync(foto.tempFilePath);
//              Actualizar el usuario con la imagen
                datos.foto = result.secure_url;
            }
        }

//      Actualizar el registro y obtenerlo
        await UserModel.findByIdAndUpdate(user._id, datos);
        const updatedUser = await UserModel.findById(user._id);

//      Generar JWT
        const token = jwt.sign({user: updatedUser}, process.env.JWT_SECRET, { expiresIn: '1y' });
        
//      Formatear usuario para la respuesta
        const respUser = {
            nombre: updatedUser.nombre,
            apellido: updatedUser.apellido,
            correo: updatedUser.correo,
            estado: updatedUser.estado,
            foto: updatedUser.foto,
            sellerId: updatedUser.sellerId
        }
                    
//      Enviar respuesta
        return res.send({token, user: respUser});
    }catch(err){
        next(err);
    }
}

/* Crear cuenta - Enviar correo */
controller.signin = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { nombre, apellido, correo, contraseña } = req.body;
        if(!nombre || !apellido || !correo || !contraseña) throw new UncompleteFieldsError(["nombre", "apellido", "correo", "contraseña"]);
        
//      Comprobar si existe el usuario con el correo
        const existentUser = await UserModel.findOne({ correo });
        if(existentUser) throw new CustomError(`Ya hay un usuario con el correo "${correo}".`, 400);
        
//      Generar codigo de 6 digitos
        const randCode = generateCode();

//      Crear el nuevo objeto de Usuario
        const newUser = {
            nombre,
            apellido,
            correo,
            contraseña: bcrypt.hashSync(contraseña, 8),
            code: randCode
        };

//      Guardar el usuario o lo reemplaza si ya existia
        await PreUserModel.findOneAndReplace({ correo }, newUser, { new: true, upsert: true });

//      Enviar email
        await mailer.sendMailTemplate(correo, "Crear cuenta", 'sign', { codigo: randCode });
        
        
//      Enviar respuesta
        res.send('Exito!');
    }catch(err){
        next(err);
    }
}

/* Crear cuenta - Comprobar codigo */
controller.siginCode = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { codigo, correo } = req.body;
        if((!codigo) || (!correo)) throw new UncompleteFieldsError(["codigo", "correo"]);

//      Comprobar si existe el preUser con el correo
        const preUser = await PreUserModel.findOne({correo});
        if(!preUser) return res.status(400).send("Correo electronico no registrado o caducado");

//      Comprobar si el codigo coincide
        if(preUser.code !== codigo) return res.status(400).send("El código ingresado es incorrecto");

//      Crear usuario
        const newUser = await new UserModel({
            nombre: preUser.nombre,
            apellido: preUser.apellido,
            correo: preUser.correo,
            contraseña: preUser.contraseña,
            sellerId: generateSellerId()
        }).save();

//      Eliminar otro preUsuario
        await PreUserModel.findByIdAndDelete(preUser._id);
        
//      Generar JWT
        const token = jwt.sign({user: newUser}, process.env.JWT_SECRET, { expiresIn: '1y' });

//      Formatear usuario para la respuesta
        const respUser = {
            nombre: newUser.nombre,
            apellido: newUser.apellido,
            correo: newUser.correo,
            estado: newUser.estado,
            foto: newUser.foto,
            sellerId: newUser.sellerId
        }

//      Enviar respuesta
        res.send({token, user: respUser});
    }catch(err){
        next(err);
    }
}

/* Crear cuenta - Reenviar código */
controller.signinResend = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { correo } = req.body;
        if(!correo) throw new UncompleteFieldsError(["correo"]);
        
//      Obtener el preUser para adquirir el codigo
        const user = await preUserModel.findOne({correo});
        if(!user) return res.status(400).send("Correo no valido, código caducado. Vuelve a iniciar el proceso de crear cuenta por favor.");
        
//      Enviar email
        await mailer.sendMailTemplate(correo, "Crear cuenta", 'sign', { codigo: user.code });

//      Enviar respuesta
        res.send('Exito!')
        
    }catch(err){
        next(err);
    }
}

/* Crear cuenta - Subir foto o estado predeterminado */
controller.signinLastSteps = async(req, res, next) => {
    try{
//      Obtener el user desde el AuthMiddleware
        let user = req.user;

//      Obtener la informacion y la imagen de la peticion
        const { estado } = req.body;
        const files = req.files;

//      Si no hay información relevante, ignorar y enviar respuesta
        if( !estado && !files ){ 
//          Obtener el usuario actualizado
            const User = await UserModel.findByIdAndUpdate(user._id);

//          Generar JWT
            const token = jwt.sign({user: User}, process.env.JWT_SECRET, { expiresIn: '1y' });
        
//          Formatear usuario para la respuesta
            const respUser = {
                nombre: User.nombre,
                apellido: User.apellido,
                correo: User.correo,
                estado: User.estado,
                foto: User.foto,
                sellerId: User.sellerId
            }
            
//          Enviar respuesta
            return res.send({token, user: respUser});
        }

//      Si se envio "estado" actualizarlo
        if(estado){
            await UserModel.findByIdAndUpdate(user._id, { estado });
        }

//      Si se envio imagen
        if(files){
//          Obtener el key "foto" en las imagenes                
            const { foto } = files;

//          Si encuentra la foto
            if(foto){
//              Almacenarla con cloudinary en la carpeta "users"
                const result = await cloudinary.uploader.upload(foto.tempFilePath, {
                    folder: 'Users',
                    resource_type: 'auto',
                    public_id: user._id,
                    overwrite: true,
                    width: 250,
                    height: 250,
                    crop: 'thumb'
                });

//              Eliminar el archivo temporal
                fs.rmSync(foto.tempFilePath);

//              Actualizar el usuario con la imagen
                await UserModel.findByIdAndUpdate(user._id, { 
                    foto: result.secure_url
                });
            }
        }
//      Obtener el usuario actualizado
        const updatedUser = await UserModel.findByIdAndUpdate(user._id);

//      Generar JWT
        const token = jwt.sign({user: updatedUser}, process.env.JWT_SECRET, { expiresIn: '1y' });
        
//      Formatear usuario para la respuesta
        const respUser = {
            nombre: updatedUser.nombre,
            apellido: updatedUser.apellido,
            correo: updatedUser.correo,
            estado: updatedUser.estado,
            foto: updatedUser.foto,
            sellerId: updatedUser.sellerId
        }
    
//      Enviar respuesta
        res.send({token, user: respUser});
    }catch(err){
        next(err);
    }
}

/* Recuperar contraseña - Enviar codigo */
controller.forgot = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { correo } = req.body;
        if(!correo) throw new UncompleteFieldsError(["correo"]);

//      Comprobar si existe el preUser con el correo
        const user = await UserModel.findOne({correo});
        if(!user) return res.status(400).send("No hay ningúna cuenta asociada a ese correo");

//      Generar codigo de 6 digitos
        const randCode = generateCode();

//      Generar preUser para la confirmación
        const newPreUser = {
            nombre: user.nombre,
            apellido: user.apellido,
            correo: user.correo,
            contraseña: user.contraseña,
            code: randCode
        };

//      Guardar el usuario o lo reemplaza si ya existia
        await PreUserModel.findOneAndReplace({ correo }, newPreUser, { new: true, upsert: true });

//      Enviar email
        await mailer.sendMailTemplate(correo, "Recuperar cuenta", 'forgot', { codigo: randCode });


//      Enviar respuesta
        res.send('Exito!')
    }catch(err){
        next(err);
    }
}

/* Recuperar contraseña - Obtener codigo */
controller.forgotCode = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { codigo, correo, contraseña } = req.body;
        if((!codigo) || (!correo)) throw new UncompleteFieldsError(["codigo", "correo", "contraseña"]);

//      Comprobar si existe el preUser con el correo
        const preUser = await PreUserModel.findOne({correo});
        if(!preUser) return res.status(400).send("Correo electronico no registrado o caducado");

//      Comprobar si el codigo coincide
        if(preUser.code !== codigo) return res.status(400).send("Codigo incorrecto");

//      Obtener el usuario
        const user = await UserModel.findOne({correo});
        if(!user) return res.status(400).send("Correo no valido, puede que no haya una cuenta asociada con el correo electronico");

//      Actualizar User con la nueva contraseña
        await UserModel.findByIdAndUpdate(user._id, { contraseña: bcrypt.hashSync(contraseña, 8) })

//      Eliminar otro preUsuario
        await PreUserModel.findByIdAndDelete(preUser._id);

//      Obtener el User actualizado
        const updatedUser = await UserModel.findById(user._id);

//      Generar JWT
        const token = jwt.sign({user: updatedUser}, process.env.JWT_SECRET, { expiresIn: '1y' });

//      Formatear usuario para la respuesta
        const respUser = {
            nombre: updatedUser.nombre,
            apellido: updatedUser.apellido,
            correo: updatedUser.correo,
            estado: updatedUser.estado,
            foto: updatedUser.foto,
            sellerId: updatedUser.sellerId
        }

//      Enviar respuesta
        res.send({token, user: respUser});
    }catch(err){
        next(err);
    }
}

/* Recuperar contraseña - Reenviar código */
controller.forgotResend = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { correo } = req.body;
        if(!correo) throw new UncompleteFieldsError(["correo"]);

//      Obtener el preUser para adquirir el codigo
        const user = await preUserModel.findOne({correo});
        if(!user) return res.status(400).send("Correo no valido, puede que no haya una cuenta asociada con el correo electronico");

//      Enviar email
        await mailer.sendMailTemplate(correo, "Recuperar cuenta", 'forgot', { codigo: user.code });

//      Enviar respuesta
        res.send('Exito!')
    }catch(err){
        next(err);
    }
}

controller.getPermiso = async(req, res, next) => {
    try {
        const { user } = req;

        res.send(user.type);
    } catch(err) {
        next(err);
    }
}

/*
                E X A M P L E
*/
controller.protected = async(req, res, next) => {
    console.log(req.user);
    res.send("hasijdhjasuhjdhguiasd")
}


module.exports = controller;

// Genera codigo aleatorio para los preUser
function generateCode(){
    const chars = "0123456789";
    let code = '';

    for (let i = 0; i < 6; i++) {
        let randomIndx = Math.floor(Math.random() * chars.length);
        code += chars.charAt(randomIndx);
    }
    
    return code;
}

// Genera un codigo de vendedor unico
function generateSellerId(){
    const date = Date.now();

    return date+generateCode();
}