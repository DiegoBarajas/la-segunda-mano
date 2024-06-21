const { Schema, model } = require('mongoose');

const userSchema = new Schema({

},{
    timestapms: true
});

module.exports = model('usuario', userSchema);