const CustomError = require('../errors/CustomError');
const ReviewModel = require('../models/review.model');
const UserModel = require('../models/user.model');
const moment = require('moment-timezone');

const controller = {}

// Crear review
controller.createReview = async(req, res, next) => {
    try{
        const { user, body } = req;

        const commentedUser = await UserModel.findOne({ sellerId: body.commentedUser });
        console.log(commentedUser);

        const myReviews = await ReviewModel.find({ authorId: user._id });
        if(myReviews.length > 0) throw new CustomError("Ya emitiste una reseña a este usuario, si deseas modificarla eliminala y creala nuevamente");

        await new ReviewModel({
            authorId: user._id,
            commentedUserId: commentedUser._id,
            calificacion: body.calificacion,
            contenido: body.contenido,
            fechaCreacion: moment().tz('America/Mexico_City').format('DD-MM-YYYY')
        }).save();

        res.send("Exito!")
    }catch(err){
        next(err);
    }
}

// Eliminar reseña
controller.deleteReview = async(req, res, next) => {
    try{
        const { id } = req.params;
        const { user } = req;

        const review = await ReviewModel.findById(id);
        if(!review) throw new CustomError("No se encontró la reseña");

        if(review.authorId.toString() != user._id.toString()) throw new CustomError("Acceso denegado");

        await ReviewModel.findByIdAndDelete(id);
        
        res.send("Reseña eliminada!")
    }catch(err){
        next(err);
    }
}

module.exports = controller;