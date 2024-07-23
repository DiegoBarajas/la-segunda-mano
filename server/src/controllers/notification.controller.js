const notificationModel = require('../models/notifications.model');
const moment = require('moment-timezone');
const mailer = require('../mailer');
const userModel = require('../models/user.model');
const controller = {}

controller.getAllNotifications = async(req, res, next) => {
    try{
        const { user } = req;
        
        const notifications = await notificationModel.find({ userId: user._id }).sort({ createdAt: -1 });
        await notificationModel.updateMany({ visto: false }, { visto: true })

        res.send(notifications);

    }catch(err){
        next(err);
    }
}

controller.getNotificationsCounter = async(req, res, next) => {
    try{
        const { user } = req;
        
        const notifications = await notificationModel.find({ userId: user._id, visto: false });

        res.send({counter: notifications.length});
    }catch(err){
        next(err);
    }
}

controller.createNotification = async( userId, titulo, contenido, icono='default', url='/notificaciones' ) => {
    try {
        const newNotification = await new notificationModel({
            userId, 
            titulo, 
            contenido, 
            icono, 
            url,
            fecha: moment().tz('America/Mexico_City').format('DD-MM-YYYY')
        }).save();
        
        const user = await userModel.findById(userId);

        mailer.sendMailTemplate(user.correo, "Tienes una nueva notificación", 'notification', {
            nombre: user.nombre.split(' ')[0],
            titulo,
            contenido,
            url,
        })

        return newNotification;
    }catch(err){
        throw err;
    }
}

module.exports = controller;