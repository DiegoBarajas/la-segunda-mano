const announcementModel = require('../models/announcement.model');  
const cloudinary = require('cloudinary').v2;
const moment = require('moment-timezone');
const colors = require('colors/safe');
const mailer = require('../mailer');

// Objeto que almacenará las tareas
const jobs = {};

// Eliminar los anuncios caducados
jobs.deleteAnnouncementsCaduced = async() => {
    let contador = 0;

    try{
//      Obtener todos los anuncios
        const announcements = await announcementModel.find()

//      Iterar los anuncios
        announcements.forEach(async(ann) => {
//      Obtener los objetos de la fecha actual y de la fecha de expiración de la itereacion actual
        const currentMomment = moment.tz('America/Mexico_City');
        const targetDate = moment(ann.fechaExpiracion, 'DD-MM-YYYY').tz('America/Mexico_City').add(1, 'day');

//      Comprobar si la fecha de expiracion ya pasó
        if(currentMomment.isAfter(targetDate)){

//          Obtener los recursos dentro de la carpeta
            const result = await cloudinary.search
                .expression(`folder:${ann._id}`)
                .execute();

//          Obtener los public ID de las recursos
            const publicIds = result.resources.map((resource) => resource.public_id);

//          Eliminar los recursos en la carpeta
            for (const publicId of publicIds) {
                await cloudinary.uploader.destroy(publicId);
            }
        
//          Eliminar la carpeta
            await cloudinary.api.delete_folder(ann._id);

//          Eliminar el anuncio de la db
            await announcementModel.findByIdAndDelete(ann._id);  
            contador++;

//          Log de la eliminación
            const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');             
            console.log(colors.magenta(`\n${requestTime}    [   CRON   ] Tarea "Eliminar los anuncios caducados" Elemento "${ann._id}" eliminado.`));            }
        });

        mailer.sendMail('desaubv@gmail.com', "cron prueba", `${contador} registros eliminados.`, `${contador} registros eliminados.`);
    
        return `${contador} registros eliminados.`;
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