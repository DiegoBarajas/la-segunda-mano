const AnnouncementModel = require('../models/announcement.model');
const cloudinary = require('cloudinary').v2;
const moment = require('moment-timezone');
const fs = require('fs');
const CustomError = require('../errors/CustomError');
const userModel = require('../models/user.model');
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

//      Obtener el anuncio de la base de datos
        const announcement = await AnnouncementModel.findById(id);

//      Si no existe enviar respuesta
        if(!announcement) {throw new CustomError('El anuncio no existe. Puede que el anuncio haya caducado')};

//      Obtener el usuario que lo publico
        const author = await userModel.findById(announcement.userId);

//      Enviar respuesta con el anuncio
        res.send({announcement, author});
    }catch(err){
        next(err);
    }
}

module.exports = controller;