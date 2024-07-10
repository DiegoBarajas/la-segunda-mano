const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    code: { type: String, expires: '1h' },
},{
    timestapms: true
});

module.exports = model('PreUser', userSchema);