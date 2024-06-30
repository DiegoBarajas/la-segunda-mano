const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UncompleteFieldsError = require('../errors/UncompleteFieldsError');
const CustomError = require('../errors/CustomError');

require('dotenv').config();

const controller = {};

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

controller.signin = async(req, res, next) => {
    try{
//      Obtener los params del body        
        const { nombre, apellido, correo, contraseña } = req.body;
        if(!nombre || !apellido || !correo || !contraseña) throw new UncompleteFieldsError(["nombre", "apellido", "correo", "contraseña"]);
        
//      Comprobar si existe el usuario con el correo
        const existentUser = await UserModel.findOne({ correo });
        if(existentUser) throw new CustomError(`Ya hay un usuario con el correo "${correo}".`, 400);
        
//      Crear el nuevo objeto de Usuario
        const newUser = new UserModel({
            nombre,
            apellido,
            correo,
            contraseña: bcrypt.hashSync(contraseña, 8)
        });

//      Guardar el usuario
        await newUser.save();
        
//      Enviar respuesta
        res.json(newUser);

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
