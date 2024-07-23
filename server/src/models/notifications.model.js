const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    
    titulo: { type: String, required: true },
    contenido: { type: String, required: true },
    icono: { type: String, enum: ["default", "deleteNotification", "selledNotification"], default: 'default', required: true },
    visto: { type: Boolean, default: false },
    url: { type: String, default: '/notificaciones', required: true },
    fecha: { type: String, required: true },
},{
    timestamps: true
});

module.exports = model('notification', notificationSchema);