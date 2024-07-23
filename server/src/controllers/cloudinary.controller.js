const cloudinary = require('cloudinary').v2;
const moment = require('moment-timezone');
const colors = require('colors/safe');
const controller = {};

controller.deleteFolder = async(folderName) => {
    try {
        // Listar todos los recursos en la carpeta
        const { resources } = await cloudinary.search
          .expression(`folder:${folderName}`)
          .execute();
    
        // Eliminar todos los recursos en la carpeta
        const deletePromises = resources.map(resource => 
          cloudinary.uploader.destroy(resource.public_id)
        );
        await Promise.all(deletePromises);
    
        // Eliminar la carpeta
        const result = await cloudinary.api.delete_folder(folderName);
        return result;
    } catch (err) {
        const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

        console.log(colors.red(`${requestTime}    [  CLOUDINARY: ERROR  ] ${err.name ? err.name : err.error.message}:`))
        console.error(colors.red(err));
    }
    
}

module.exports = controller;