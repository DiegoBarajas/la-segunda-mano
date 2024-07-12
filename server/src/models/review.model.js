const { Schema, model } = require('mongoose');

const reviewSchema = new Schema({
    authorId: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    commentedUserId: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },

    calificacion: { type: Number, required: true, min: 1 },
    contenido: { type: String, required: true },
    fechaCreacion: { type: String, required: true },
    importancia: { type: Number, default: 0, required: true }
});

module.exports = model('reviews', reviewSchema);