const AnnouncementModel = require('../models/announcement.model');
const ReviewModel = require('../models/review.model');
const userModel = require('../models/user.model');
const CustomError = require('../errors/CustomError');
const cloudinary = require('cloudinary').v2;
const moment = require('moment-timezone');
const fs = require('fs');
const controller = {};

controller.createAnnouncement = async(req, res, next) => {
    try{
//      Obtener la data del body y files de la peticion, y el user del middleware de autenticación
        const { body, files, user } = req;

//      Obtener y parsear a JSON campos del body
        const caracteristicas = JSON.parse(body.caracteristicas);
        const contacto = JSON.parse(body.contacto);
        const formasEntrega = body.formasEntrega ? JSON.parse(body.formasEntrega) : null;

//      Obtener la fecha actual de la ciudad de Mexico, y clonar otra con 7 dias adicionales
        const fechaCreacion = moment().tz('America/Mexico_City');
        const fechaExpiracion = fechaCreacion.clone().add(7, 'days');

//      Clonar el body para agregarle mas data (la obtenida previamente)
        const announcementData = {...body};
        announcementData.userId = user._id;
        announcementData.caracteristicas = caracteristicas;
        announcementData.contacto = contacto;
        announcementData.formasEntrega = formasEntrega;
        announcementData.fechaCreacion = fechaCreacion.format('DD-MM-YYYY'); // Formatear las fechas a DD-MM-AAAA
        announcementData.fechaExpiracion = fechaExpiracion.format('DD-MM-YYYY');

//      Crear la instancia del modelo
        const newAnnouncement = new AnnouncementModel(announcementData);

//      Obtener el campo de las imagenes de los files
        const imagenesFiles = files['imagenes'];

//      Si es array se hara un map
        if(Array.isArray(imagenesFiles)){
//          Recorrer con un map para almacenar en cloudinary todas las imagenes 
            const imagenesPromises = imagenesFiles.map(async(img) => {
            const result = await cloudinary.uploader.upload(img.tempFilePath, {
                folder: newAnnouncement._id,
                resource_type: 'auto',
                public_id: img.name,
                overwrite: true,
                width: 500,
                height: 500,
                crop: 'thumb'
            });

            fs.unlinkSync(img.tempFilePath);
            return(result.secure_url);
        })

//          Obtener la respuesta post-promesa de el map anterior
            const imagenes = await Promise.all(imagenesPromises);
            newAnnouncement.imagenes = imagenes; // Almacenar ese array en el modelo
        }else{
            const result = await cloudinary.uploader.upload(imagenesFiles.tempFilePath, {
                folder: newAnnouncement._id,
                resource_type: 'auto',
                public_id: imagenesFiles.name,
                overwrite: true,
                width: 500,
                height: 500,
                crop: 'thumb'
            });

            fs.unlinkSync(imagenesFiles.tempFilePath);
            newAnnouncement.imagenes = [ result.secure_url ];
        }

//      Guardar el modelo en la db
        await newAnnouncement.save();

//      Enviar respuesta el ID de la publicación
        res.send(newAnnouncement._id);

    }catch(err){
        next(err);
    }
}

// Obtener registro de anuncio
controller.getAnnouncement = async(req, res, next) => {
    try {
//      Obtener el id de la petición
        const { id } = req.params;
        const { user } = req;

//      Obtener el anuncio de la base de datos
        const announcement = await AnnouncementModel.findById(id);

//      Si no existe enviar respuesta
        if(!announcement) {throw new CustomError('El anuncio no existe. Puede que el anuncio haya caducado')};

//      Obtener el usuario que lo publico y acomodar el objeto de retorno
        let author = await userModel.findById(announcement.userId)
            .select('nombre apellido foto sellerId');

//      Convertir el resultado a JSON
        author = author.toJSON();

//      Obtener las reviews del usuario
        const reviewsDoc = await ReviewModel.find({ commentedUserId: author._id})
            .sort({ importancia: -1 })
            .limit(10)
            .populate('authorId', 'nombre apellido foto')
            .exec();
    
//      Constante que almacena las reviews procesadas y que almacena si ya se hizo una reseña a ese usuario
        const reviews = [];
        let canMakeReview = true;

//      Filtrar las reviews
        reviewsDoc.forEach((rev) => {
            if(!user) return reviews.push(rev);

            if(rev.authorId.id == user._id) {
                const currentReview = rev.toJSON();
                currentReview.mio = true;
                canMakeReview = false;

                return reviews.unshift( currentReview );
            }
            reviews.push(rev);
        });
        
//      Obtener cantidad y calificacion del autor
        const result = await ReviewModel.aggregate([
            {
                $match: { commentedUserId: author._id } // Filtro por commentedUserId
            },{
                $group: {
                    _id: null,
                    calificacion: { $sum: "$calificacion" },
                    evaluadores: { $sum: 1 },
                }
            }
        ]);
        
//      Agregar campos al autor
        author.calificacion = (result[0].calificacion / result[0].evaluadores).toFixed(1);
        author.evaluadores = result[0].evaluadores;

//      Eliminar id del author
        delete author._id;

//      Enviar respuesta con el anuncio
        res.send({announcement, author, reviews, canMakeReview});
    }catch(err){
        next(err);
    }
}


module.exports = controller;