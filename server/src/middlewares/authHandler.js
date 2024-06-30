const jwt = require('jsonwebtoken');
const colors = require('colors/safe');
const CustomError = require('../errors/CustomError');
const errorHandler = require('../middlewares/errorHandler');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const token = req.headers['authorization'];
    
        if(!token){ 
            console.error(colors.yellow(`[ NO AUTORIZADO ] Token no proporcionado`), '\n');
            throw new CustomError("Token no proporcionado", 407);
        }
    
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err instanceof jwt.TokenExpiredError){
                console.error(colors.yellow(`[ NO AUTORIZADO ] Token caducado`), '\n');
                throw new CustomError("El token ha caducado", 401);
            }else if(err){ 
                console.error(colors.yellow(`[ NO AUTORIZADO ] Token no valido`), '\n');
                throw new CustomError("No autorizado", 401);
            }

            req.user = decoded.user;
            next();
        });
    }catch(err){
        errorHandler(err, req, res, next);
    }
}