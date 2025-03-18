const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, default : ""},
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    sellerId: { type: String, required: true, unique: true },

    estado: { type: String, default: null, required: false },
    foto: { type: String, default: null, required: false },
    
    active: { type: Boolean, default: true, required: true },
    type: { type: String, default: 'default', required: true, enum: ['admin', 'default', 'moderator'] }
},{
    timestapms: true
});

module.exports = model('user', userSchema);
