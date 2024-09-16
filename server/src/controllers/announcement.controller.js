const AnnouncementModel = require('../models/announcement.model');
const FavoriteModel = require('../models/favorite.model');
const ReviewModel = require('../models/review.model');
const CustomError = require('../errors/CustomError');
const userModel = require('../models/user.model');
const cloudinary = require('cloudinary').v2;
const moment = require('moment-timezone');
const colors = require('colors/safe');
const Stripe = require('stripe');
const fs = require('fs');
require('dotenv').config();

const { createNotification } = require('./notification.controller');
const favoriteModel = require('../models/favorite.model');
const cloudinaryController = require('./cloudinary.controller');
const announcementModel = require('../models/announcement.model');
const { log } = require('console');

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
        const fechaExpiracion = fechaCreacion.clone().add(10, 'days');

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
                    width: 750,
                    height: 750,
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
                width: 750,
                height: 750,
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

//      Comprobar si el anuncio es del usuario
        const mio = ((user) && (user._id.toString() == announcement.userId.toString())) ? true : false;

//      Comprobar si el anuncio esta en favoritos
        let isFavorite = false;
        if(user){
            const favorite = await FavoriteModel.findOne({ userId: user._id, announcementId: id });
            isFavorite = favorite ? true : false;
        }

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
        
//      Comprobar si tiene evaluaciones
        if(result.length > 0){
//          Agregar campos al autor
            author.calificacion = (result[0].calificacion / result[0].evaluadores).toFixed(1);
            author.evaluadores = result[0].evaluadores;
        }else{
//          Agregar campos al autor
            author.calificacion = 0;
            author.evaluadores = 0;
        }

//      Eliminar id del author
        delete author._id;

//      Enviar respuesta con el anuncio
        res.send({announcement, author, reviews, canMakeReview, mio, isFavorite});
    }catch(err){
        next(err);
    }
}

// Obtener anuncio protegido
controller.getAnnouncementProtected = async(req, res, next) => {
    try{
        const { params, user } = req;   
        const { id } = params;

        const announcement = await AnnouncementModel.findById(id);
        if(!announcement) throw new CustomError('El anuncio no fue encontrado. Puede que el anuncio haya caducado');

        if(announcement.userId.toString() != user._id.toString()) throw new CustomError('Acceso denegado.');

        res.send(announcement);
    }catch(err){
        next(err);
    }
}

// Obtener registro por usuario (Token)
controller.getAnnouncementByToken = async(req, res, next) => {
    try{
        const { user, query } = req;
        const filter = { userId: user._id }
        let sort = { createdAt: -1 }

        for(let key in query){
            if(query[key] == ignoreValues[key]) continue;


            if(key === 'estado') filter['caracteristicas.estado'] = query[key];
            if(key === 'uso') filter['caracteristicas.uso'] = query[key];
            if(key === 'categoria') filter['categoria'] = query[key];
            if(key === 'ordenar') sort = order[query[key]];
            if(key === 'ciudad'){ 
                const regex = new RegExp(query[key], 'i'); 
                filter['caracteristicas.ciudad'] = regex;
            }
        }
        
        const annoucements = await AnnouncementModel.find(filter).sort(sort);

        if('precio' in sort){
            return res.send(
                annoucements.sort((a, b) => {
                    const precioA = parseFloat(a.precio);
                    const precioB = parseFloat(b.precio);
            
                    return sort.precio > 0 ? precioA - precioB : precioB - precioA;
                })
            )
        }

        res.send(annoucements);

    }catch(err){
        next(err);
    }
}

// Obtener registro por usuario (Seller ID)
controller.getAnnouncementBySellerId = async(req, res, next) => {
    try {
        const { id } = req.params;

        const seller = await userModel.findOne({ sellerId: id });
        if(!seller) throw new CustomError("Vendedor no encontrado");

        const annoucements = await AnnouncementModel.find({ userId: seller._id });
        const reviews = await ReviewModel.aggregate([
            {
                $match: { commentedUserId: seller._id } // Filtro por commentedUserId
            },{
                $group: {
                    _id: null,
                    calificacion: { $sum: "$calificacion" },
                    evaluadores: { $sum: 1 },
                }
            }
        ]);

        const evaluadores = reviews.length > 0
            ? reviews[0].evaluadores
            : 0;

        const calificacion = reviews.length > 0
            ? (reviews[0].calificacion / evaluadores).toFixed(1)
            : 0;
        
        const sellerJson = {
            nombre: seller.nombre,
            apellido: seller.apellido,
            foto: seller.foto,
            evaluadores: evaluadores,
            calificacion: calificacion
        }

        res.send({ annoucements, seller: sellerJson });
    }catch(err){
        next(err)
    }
}

// Obtener resgistros por busqueda
controller.getAnnouncementBySearch = async(req, res, next) => {
    try {
        const { query } = req;
        const skip = query.page ? query.page * 2 : 0;
        const filter = {}
        let sort = { createdAt: -1 }
        

        for (let key in query) {
            if (query[key] == ignoreValues[key]) continue;

            if (key === 'estado') filter['caracteristicas.estado'] = query[key];
            if (key === 'uso') filter['caracteristicas.uso'] = query[key];
            if (key === 'categoria') filter['categoria'] = query[key];
            if (key === 'ordenar') sort = order[query[key]];
            if (key === 'nombre') {
                const regex = new RegExp(query[key].trim(), 'i');
                filter['titulo'] = regex;
            }
            if (key === 'ciudad') {
                const regex = new RegExp(query[key], 'i');
                filter['caracteristicas.ciudad'] = regex;
            }
        }


        // Búsqueda de anuncios regulares
        const annoucements = await AnnouncementModel.find(filter).skip(skip).limit(2).sort(sort);
        const total = await AnnouncementModel.countDocuments(filter);

        // Búsqueda de anuncios impulsados (2 aleatorios)
        const boostedAnnouncements = await AnnouncementModel.aggregate([
            { $match: { nivel: 'impulsado' } },
            { $sample: { size: 2 } }, // Escoge 2 aleatorios
            { $addFields: { showLabel: true } }
        ]);


        // Búsqueda de anuncios premium (4 aleatorios)
        const premiumAnnouncements = await AnnouncementModel.aggregate([
            { $match: { nivel: 'premium' } },
            { $sample: { size: 4 } }, // Escoge 4 aleatorios
            { $addFields: { showLabel: true } }
        ]);

        // Combinación de anuncios aleatorios con los regulares
        const finalAnnouncements = [
            ...boostedAnnouncements,
            ...premiumAnnouncements,
            ...annoucements
        ].slice(0, 10); // Limitar la respuesta a 10 anuncios

        // Ordenar por precio si es necesario
        if ('precio' in sort) {
            return res.send(
                finalAnnouncements.sort((a, b) => {
                    const precioA = parseFloat(a.precio);
                    const precioB = parseFloat(b.precio);
                    return sort.precio > 0 ? precioA - precioB : precioB - precioA;
                })
            );
        }

        res.send({ annoucements: finalAnnouncements, total });

    } catch (err) {
        next(err);
    }
}


// Eliminar anuncio 
controller.deleteMyAnnoucement = async(req, res, next) => {
    try{
        const { user } = req;
        const { id } = req.params;

        const announcement = await AnnouncementModel.findById(id);
        if(announcement.userId.toString() !=  user._id.toString()) throw new CustomError("Acceso denegado");

        const favorites = await favoriteModel.find({ announcementId: id });
        favorites.forEach((f) => {
            createNotification(
                f.userId, 
                `El anuncio "${announcement.titulo}" fue eliminado.`,
                `El vendedor del anuncio "${announcement.titulo}", que marcaste como "Favorito", ha eliminado el anuncio. Por lo tanto, se eliminará de tus favoritos.`,
                'deleteNotification',
                '/favoritos'
            )
        })

        const success = await controller.deleteAnnoucement(id);
        res.send(success);
    }catch(err){
        next(err);
    }
}

// Marcar anuncio como vendido
controller.iHadSelledMyAnnoucement = async(req, res, next) => {
    try{
        const { user } = req;
        const { id } = req.params;

        const announcement = await AnnouncementModel.findById(id);
        if(announcement.userId.toString() !=  user._id.toString()) throw new CustomError("Acceso denegado");

        const favorites = await favoriteModel.find({ announcementId: id });
        favorites.forEach((f) => {
            createNotification(
                f.userId, 
                `El anuncio "${announcement.titulo}" ha sido vendido.`,
                `El vendedor del anuncio "${announcement.titulo}", que marcaste como "Favorito", ha vendido el producto/servicio. Por lo tanto, se eliminará de tus favoritos.`,
                'selledNotification',
                '/favoritos'
            )
        })

        const success = await controller.deleteAnnoucement(id);
        res.send(success);
    }catch(err){
        next(err);
    }
}

// Metodo generico para eliminar un anuncio
controller.deleteAnnoucement = async(id) => {
    try{
//      Obtener el objeto de anuncio
        const ann = await AnnouncementModel.findById(id);
        if(!ann) throw new CustomError("Registro no encontrado");

//      Eliminar todos los favoritos donde se haga referencia al anuncio
        await FavoriteModel.deleteMany({ announcementId: id });
    
//      Eliminar el anuncio de la db
        await AnnouncementModel.findByIdAndDelete(ann._id);

//      Eliminar las imagenes de cloudinary
        await cloudinaryController.deleteFolder(id)

        return true;
    }catch(err){
        console.log(err);
        throw err;
    }
}

// Editar anuncio
controller.editAnnouncement = async(req, res, next) => {
    try{
        const { params, body, user, files } = req;
        const { id } = params;

//      Obtener y parsear a JSON campos del body
        const caracteristicas = JSON.parse(body.caracteristicas);
        const contacto = JSON.parse(body.contacto);
        const formasEntrega = body.formasEntrega ? JSON.parse(body.formasEntrega) : null;

        const announcement = await AnnouncementModel.findById(id);
        if(!announcement) throw new CustomError('El anuncio no fue encontrado. Puede que el anuncio haya caducado');

        if(announcement.userId.toString() != user._id.toString()) throw new CustomError('Acceso denegado.');

        const newImages = body.fotos ? body.fotos : [];
        let newLinks = [];
        if(files){
//          Obtener el campo de las imagenes de los files
            const imagenesFiles = files['fotos'];

//          Si es array se hara un map
            if(Array.isArray(imagenesFiles)){
//              Recorrer con un map para almacenar en cloudinary todas las imagenes 
                const imagenesPromises = imagenesFiles.map(async(img) => {
                    const result = await cloudinary.uploader.upload(img.tempFilePath, {
                        folder: id,
                        resource_type: 'auto',
                        public_id: img.name,
                        overwrite: true,
                        width: 750,
                        height: 750,
                        crop: 'thumb'
                    });
        
                    fs.unlinkSync(img.tempFilePath);
                    return(result.secure_url);
                })
        
//              Obtener la respuesta post-promesa de el map anterior
                const imagenes = await Promise.all(imagenesPromises);
                newLinks = imagenes; // Almacenar ese array en el modelo
            }else{
                const result = await cloudinary.uploader.upload(imagenesFiles.tempFilePath, {
                    folder: id,
                    resource_type: 'auto',
                    public_id: imagenesFiles.name,
                    overwrite: true,
                    width: 750,
                    height: 750,
                    crop: 'thumb'
                });
        
                fs.unlinkSync(imagenesFiles.tempFilePath);
                newLinks = [ result.secure_url ];
            }
        }

        const imagenes = Array.isArray(newImages) ? [...newImages, ...newLinks] : [newImages, ...newLinks];
        const newData = {...body, "imagenes": imagenes};
        newData.caracteristicas = caracteristicas;
        newData.contacto = contacto;
        newData.formasEntrega = formasEntrega;

        const updatedAnn = await announcementModel.findByIdAndUpdate(id, newData);

        res.send(id);
    
    }catch(err){
        next(err)
    }
}

// Payment intent
controller.getPaymentIntent = async(req, res, next) => {
    try{
        const { query, params, user } = req;
        const {id} = params;
        const stripe = Stripe(process.env.STRIPE_SECRET);

        const announcement = await announcementModel.findById(id);
        if(!announcement) throw new CustomError("Anuncio no encontrado", 400);
        if(user._id.toString() != announcement.userId.toString()) throw new CustomError("Acceso no autorizado, no eres el dueño de el anuncio.", 400);
        
        const AMOUNT = getAmount(query);
        const paymentIntent = await stripe.paymentIntents.create({
            amount: AMOUNT*100,
            currency: 'mxn',
            payment_method_types: ['card'],
            metadata: {
                announcement_id: id,
                plan: query.plan
            },
        });        

        console.log(paymentIntent.client_secret);
        

        res.send({ clientSecret: paymentIntent.client_secret, amount: paymentIntent.amount, currency: paymentIntent.currency });
    }catch(err){
        next(err)
    }

    function getAmount(query){
        const { plan } = query;
        switch(plan){
            case "impulsado": return 99;
            case "premium": return 199;
            default: throw new CustomError("Plan no valido", 400);
        }
    }
}

// Mejorar el anuncio
controller.upgradeAnnoncement = async(req, res, next) => {
    const FRONTEND = process.env.FRONTEND;
    try{
        const { query } = req;

        if( !query.payment_intent ) throw new CustomError("No se envio el payment intent");
        

        const stripe = Stripe(process.env.STRIPE_SECRET);
        const paymentIntent = await stripe.paymentIntents.retrieve(query.payment_intent);
        const { status, metadata } = paymentIntent;

        if(status !== 'succeeded') return res.redirect(`${FRONTEND}/anuncio/mejorar/error?title=Error al mejorar el anuncio&message=El pago no ha sido procesado, el status actual es: ${status}`);
        const announcement = await announcementModel.findById(metadata.announcement_id);

        if(!announcement) return res.redirect(`${FRONTEND}/anuncio/${announcement._id}/mejorar/error?title=Error al mejorar el anuncio&message=No se encontró el anuncio`);
        const { mejoras, nivel, fechaExpiracion } = announcement;

        const fechaInicio = mejoras.length > 0
                                ? moment( mejoras[mejoras.length-1].fechaFin, 'DD-MM-YYYY' ).tz('America/Mexico_City').add(1, 'days')
                                : moment().tz('America/Mexico_City');
        const fechaFin = fechaInicio.clone().add(metadata.plan === "premium" ? 60 : 30, 'days');
        const newFechaExpiracion = moment(fechaExpiracion, 'DD-MM-YYYY').tz('America/Mexico_City').add(metadata.plan === "premium" ? 60 : 30, 'days');

        const mejora = {
            nivel: metadata.plan,
            fechaInicio: fechaInicio.format('DD-MM-YYYY'),
            fechaFin: fechaFin.format('DD-MM-YYYY'),
            intentId: query.payment_intent
        }

        await announcementModel.findByIdAndUpdate(announcement._id, {
            nivel: nivel === 'estandar' ? metadata.plan : nivel,
            mejoras: [...mejoras, mejora],
            fechaExpiracion: newFechaExpiracion.format('DD-MM-YYYY')
        });
        
        res.redirect(`${FRONTEND}/anuncio/${announcement._id}/mejorar/exito`);

    }catch(err){
        const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

        console.log(colors.red(`${requestTime}    [ ${req.method}: ERROR ] ${req.url}:`))
        console.error(colors.red(err.stack));

        if(err.type == 'StripeInvalidRequestError') 
            return res.redirect(`${FRONTEND}/anuncio/mejorar/error?title=Error al mejorar el anuncio&message=${err.message}`);
        else 
            return res.redirect(`${FRONTEND}/anuncio/mejorar/error?title=Error al mejorar el anuncio&message=${err.message}`);

        
    }
}

module.exports = controller;

// Objeto para comprobar los keys del query 
const ignoreValues = {
    estado: '*',
    ciudad: '',
    categoria: 'Mostrar todo',
    uso: '*' 
}

// Manera de filtrado segun codigo
const order = {
    "date:asc": { createdAt: -1 },
    "date:desc": { createdAt: 1 },
    "alf:asc": { titulo: 1 },
    "alf:desc": { titulo: -1 },
    "price:asc": { precio: 1 },
    "price:desc": { precio: -1 }
}