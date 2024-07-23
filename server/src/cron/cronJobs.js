const { createNotification } = require('../controllers/notification.controller');
const announcementModel = require('../models/announcement.model');
const favoriteModel = require('../models/favorite.model');

const cloudinary = require('cloudinary').v2;
const moment = require('moment-timezone');
const colors = require('colors/safe');
const mailer = require('../mailer');
const { deleteAnnoucement } = require('../controllers/announcement.controller');

// Objeto que almacenará las tareas
const jobs = {};

// Eliminar los anuncios caducados
jobs.deleteAnnouncementsCaduced = async() => {
    try {
//      Obtener todos los anuncios
        const announcements = await announcementModel.find();

//      Iterar los anuncios
        const promesas = announcements.map(async(ann) => {
//          Obtener los objetos de la fecha actual y de la fecha de expiración de la itereacion actual
            const currentMomment = moment.tz('America/Mexico_City');
            const targetDate = moment(ann.fechaExpiracion, 'DD-MM-YYYY').tz('America/Mexico_City').add(1, 'day');

//          Si la fecha de caducidad ya pasó
            if(currentMomment.isAfter(targetDate)){

//              Enviar notificacion al autor
                createNotification( 
                    ann.userId, 
                    `Tu anuncio "${ann.titulo}" ha caducado.`,
                    `Tu anuncio "${ann.titulo}" creado el ${ann.fechaCreacion}", ha caducado. Por lo tanto, se eliminó.`,
                    'annoucementDeleted',
                    '/perfil/anuncios',
                    true
                )

//              Eliminar anuncio
                const success = await deleteAnnoucement(ann._id);

//              Log de la eliminación
                const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');             
                console.log(colors.magenta(`\n${requestTime}    [   CRON   ] Tarea "Eliminar los anuncios caducados" Elemento "${ann._id}" eliminado.`));  

                return ann._id;
            }
        });

        const respuestas = await Promise.all(promesas);
        const filteredResp = respuestas.filter(element => element !== undefined);

        return `${filteredResp.length} Anuncios eliminados.`
    }catch(err){
        const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

        console.log(colors.red(`${requestTime}    [  CRON: ERROR  ] ${err.name ? err.name : err.error.message}:`))
        console.error(colors.red(err));
    }
}

jobs.deleteAnnouncementsCaducedTMP = async() => {
    let contador = 0;

    try{
//      Obtener todos los anuncios
        const announcements = await announcementModel.find();

        console.log('Hola 1');

//      Iterar los anuncios
        announcements.forEach(async(ann) => {
//      Obtener los objetos de la fecha actual y de la fecha de expiración de la itereacion actual
        const currentMomment = moment.tz('America/Mexico_City');
        const targetDate = moment(ann.fechaExpiracion, 'DD-MM-YYYY').tz('America/Mexico_City').add(1, 'day');

        console.log('Hola 2');

//      Comprobar si la fecha de expiracion ya pasó
        if(currentMomment.isAfter(targetDate)){
            console.log('Hola 3');

//          Obtener los recursos dentro de la carpeta
            const result = await cloudinary.search
                .expression(`folder:${ann._id}`)
                .execute();

//          Obtener los public ID de las recursos
            const publicIds = result.resources.map((resource) => resource.public_id);

            console.log('Hola 4');

//          Eliminar los recursos en la carpeta
            for (const publicId of publicIds) {
                await cloudinary.uploader.destroy(publicId);
            }
        
//          Eliminar la carpeta
            await cloudinary.api.delete_folder(ann._id);

//          Enviar notificacion al autor
//             const noti = await createNotification( 
//                 ann.userId, 
//                 `Tu anuncio "${ann.titulo}" ha caducado.`,
//                 `Tu anuncio "${ann.titulo}" creado el ${ann.fechaCreacion}", ha caducado. Por lo tanto, se eliminanó.`,
//                 'annoucementDeleted',
//                 '/perfil/anuncios'
//             )

// //          Enviar notificacion a los que lo tenian en favoritos
//             const favorites = await favoriteModel.find({ announcementId: ann._id });
//             favorites.forEach(async(f) => {
//                 const res = await createNotification(
//                     f.userId, 
//                     `El anuncio "${ann.titulo}" ha caducado.`,
//                     `El anuncio "${ann.titulo}", que marcaste como "Favorito", ha caducado. Por lo tanto, se eliminará de tus favoritos.`,
//                     'annoucementDeleted',
//                     '/favoritos'
//                 )
//             });

//          Eliminar el anuncio de la db
            //await announcementModel.findByIdAndDelete(ann._id);  
            contador++;

//          Log de la eliminación
            const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');             
            console.log(colors.magenta(`\n${requestTime}    [   CRON   ] Tarea "Eliminar los anuncios caducados" Elemento "${ann._id}" eliminado.`));            }
        });
        console.log('Hola 5');

        //const mail = await mailer.sendMail('desaubv@gmail.com', "cron prueba", `${contador} registros eliminados.`, `${contador} registros eliminados.`);
        console.log('Hola 6');
    
        return `Done registros eliminados.`;
    }catch(err){
        const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

        console.log(colors.red(`${requestTime}    [  CRON: ERROR  ] ${err.name ? err.name : err.error.message}:`))
        console.error(colors.red(err));
    }
}

// EJEMPLO DE TAREA DE CRON CON SU RETORNO
jobs.example = () => {
    return({
        name: 'Ejemplo',
        return: "EXITO!"
    });
}

module.exports = jobs;