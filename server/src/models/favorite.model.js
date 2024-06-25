const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({

},{
    timestapms: true
});

module.exports = model('Favorite', favoriteSchema);