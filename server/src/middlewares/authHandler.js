const jwt = require('jsonwebtoken');
const colors = require('colors/safe');

const CustomError = require('../errors/CustomError');
const errorHandler = require('../middlewares/errorHandler');
const UserModel = require('../models/user.model');
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            console.error(colors.yellow(`[ NO AUTORIZADO ] Token no proporcionado`));
            throw new CustomError("Token no proporcionado", 407);
        }

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) {
                if (err instanceof jwt.TokenExpiredError) {
                    console.error(colors.yellow(`[ NO AUTORIZADO ] Token caducado`));
                    return next(new CustomError("El token ha caducado", 401));
                } else {
                    console.error(colors.yellow(`[ NO AUTORIZADO ] Token no valido`));
                    return next(new CustomError("No autorizado", 401));
                }
            }

            try {
                req.user = await UserModel.findById(decoded.user._id);
                if(!req.user.active){
                    console.error(colors.yellow(`[ NO AUTORIZADO ] El usuario esta dado de baja`));
                    return next(new CustomError("El usuario esta dado de baja", 401));
                }

                if (!req.user) {
                    return next(new CustomError("Usuario no encontrado", 404));
                }
                next();
            } catch (error) {
                next(error);
            }
        });
    } catch (err) {
        next(err);
    }
};