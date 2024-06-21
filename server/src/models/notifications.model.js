const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({

},{
    timestapms: true
});

module.exports = model('notificacion', notificationSchema);