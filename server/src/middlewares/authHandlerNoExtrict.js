const jwt = require('jsonwebtoken');
const colors = require('colors/safe');

const CustomError = require('../errors/CustomError');
const UserModel = require('../models/user.model');
require('dotenv').config();

module.exports = (req, res, next) => {
    try{
        const token = req.headers['authorization'];
        if(!token){ 
            return next()
        }
    
        jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
            if(err) return next();

            req.user = await UserModel.findById(decoded.user._id);
            return next();
        });
    }catch(err){
        next();
    }
}