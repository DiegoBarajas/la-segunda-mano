const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true 
    },
    contenido: { type: String, required: true },
    tipo: { type: String, enum: [], required: true },
    visto: { type: Boolean, default: false },
    url: { type: String, default: null, required: false },
},{
    timestapms: true
});

module.exports = model('Notification', notificationSchema);