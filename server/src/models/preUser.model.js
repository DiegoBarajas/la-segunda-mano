const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    code: { type: String, required: true },
    expiracion: { type: Date, default: Date.now, expires: 60 }
},{
    timestapms: true
});

module.exports = model('pre_user', userSchema);