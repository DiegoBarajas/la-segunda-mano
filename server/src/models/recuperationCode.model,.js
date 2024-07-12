const { Schema, model } = require('mongoose');

const recuperationCodeSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true,
        unique: true
    },
    codigo: { type: String, required: true, expires: 3600}
},{
    timestapms: true
});

module.exports = model('recuperation_code', recuperationCodeSchema);