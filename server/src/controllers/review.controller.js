const CustomError = require('../errors/CustomError');
const ReviewModel = require('../models/review.model');
const userModel = require('../models/user.model');
const UserModel = require('../models/user.model');
const moment = require('moment-timezone');
const { createNotification } = require('./notification.controller');

const controller = {}

// Crear review
controller.createReview = async(req, res, next) => {
    try{
//      Obtener el body y el usuario del req
        const { user, body } = req;

//      Comprobar si el usuario y el commented user son la misma persona
        if(user.sellerId == body.commentedUser) throw new CustomError("No puedes reseñarte a ti mismo");

//      Encontrar al usuario comentado y comprobar si existe
        const commentedUser = await UserModel.findOne({ sellerId: body.commentedUser });
        if(!commentedUser) throw new CustomError("No se encontró al usuario que se desea reseñar");

//      Comprobar que el usuario obtenido de req no haya emitido una reseña
        const myReviews = await ReviewModel.find({ authorId: user._id, commentedUserId: commentedUser._id });
        if(myReviews.length > 0) throw new CustomError("Ya emitiste una reseña a este usuario, si deseas modificarla eliminala y creala nuevamente");

//      Crear y almacenar reseña
        const newReview = await new ReviewModel({
            authorId: user._id,
            commentedUserId: commentedUser._id,
            calificacion: body.calificacion,
            contenido: body.contenido,
            fechaCreacion: moment().tz('America/Mexico_City').format('DD-MM-YYYY')
        }).save();

//      Formatear el objeto de retorno juntando la reseña con mi informacion
        const newReviewJson = newReview.toJSON();
        newReviewJson.mio = true;
        newReviewJson.authorId = {
            nombre: user.nombre,
            apellido: user.apellido,
            foto: user.foto
        }

//      Notificar al usuario que le han escrito una reseña
        createNotification(
            commentedUser._id, 
            "Tienes una nueva reseña", 
            `El usuario "${user.nombre} ${user.apellido}" te ha escrito una nueva reseña!`, 
            'newReview', 
            '/vendedor/'+commentedUser.sellerId+'?reviews=true'
        );
        
//      Enviar respuesta
        res.send(newReviewJson)
    }catch(err){
        next(err);
    }
}

controller.getReviewsBySellerId = async(req, res, next) => {
    try {
        const { user, query } = req;
        const { id } = req.params;

        const seller = await userModel.findOne({ sellerId: id });
        if(!seller) throw new CustomError("Vendedor no encontrado");

        let sort = { importancia: -1 }
        if(query.order) sort = orders[query.order];
        
        let skip = 0;
        if(query.page) skip = 10 * query.page;

        const reviews = await ReviewModel.find({ commentedUserId: seller._id })
            .skip(skip)
            .limit(10)
            .populate('authorId', 'nombre apellido foto')
            .sort( sort );

        if(!user){
            return res.send({ reviews });
        }

        const mio = user.sellerId == id;
        const myReview = await ReviewModel.find({ authorId: user._id, commentedUserId: seller._id });
        const canMakeReview = myReview.length > 0 ? false : true;

        const response = reviews.map((r, index) => {
            const review = r.toJSON();
            const mio = review.authorId._id.toString() == user._id.toString();
            review.mio = mio;

            return review;
        });

        return res.send({ reviews: response, canMakeReview, mio });

    }catch(err) {
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

// Recomendar reseña
controller.recomendReview = async(req, res, next) => {
    try{
        const { id } = req.params;
        const { user } = req;

        const review = await ReviewModel.findById(id);
        if(!review) throw new CustomError("No se encontró la reseña");

        await ReviewModel.findByIdAndUpdate(id,{
            importancia: review.calificacion+1
        });
        
        res.send("Exito!")
    }catch(err){
        next(err);
    }
}

module.exports = controller;

const orders = {
    "importance:desc": { importancia: -1 },
    "importance:asc": { importancia: 1 },
    "date:desc": { createdAt: -1 },
    "date:asc": { createdAt: 1 },
    "calf:desc": { calificacion: -1 },
    "calf:asc": { calificacion: 1 }
}