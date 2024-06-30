const UserModel = require('../models/user.model');
const PreUserModel = require('../models/preUser.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UncompleteFieldsError = require('../errors/UncompleteFieldsError');
const CustomError = require('../errors/CustomError');
const mailer = require('../mailer');

require('dotenv').config();
const controller = {};

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

//      Enviar respuesta
        res.send({token});
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
        await mailer.sendMail(correo, "Crear cuenta", `Tu código para crear tu cuenta es [ ${randCode} ]. NOTA: El codigo es valido por una hora`);
        
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
        if(preUser.code !== codigo) return res.status(400).send("Codigo incorrecto");

//      Crear usuario
        const newUser = await new UserModel({
            nombre: preUser.nombre,
            apellido: preUser.apellido,
            correo: preUser.correo,
            contraseña: preUser.contraseña
        }).save();

//      Eliminar otro preUsuario
        await PreUserModel.findByIdAndDelete(preUser._id);
        
//      Generar JWT
        const token = jwt.sign({newUser}, process.env.JWT_SECRET, { expiresIn: '1y' });

//      Enviar respuesta
        res.send({token});
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
        await mailer.sendMail(correo, "Recuperar cuenta", `Tu código para recuperar tu cuenta es [ ${randCode} ]. NOTA: El codigo es valido por una hora`);

        res.send('Exito!')
        
    }catch(err){
        next(err);
    }
}

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
        const token = jwt.sign({updatedUser}, process.env.JWT_SECRET, { expiresIn: '1y' });

//      Enviar respuesta
        res.send({token});
    }catch(err){
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