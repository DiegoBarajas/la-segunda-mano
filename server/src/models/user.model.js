const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },

    estado: { type: String, default: null, required: false },
    foto: { type: Buffer, default: null, required: false },
},{
    timestapms: true
});

module.exports = model('User', userSchema);