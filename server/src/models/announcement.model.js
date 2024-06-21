const { Schema, model } = require('mongoose');

const announcementSchema = new Schema({

},{
    timestapms: true
});

module.exports = model('anuncio', announcementSchema);