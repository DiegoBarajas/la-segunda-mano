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
    contenido: { type: String, default: "" },
    fechaCreacion: { type: String, required: true },
    importancia: { type: Number, default: 0, required: true }
},{
    timestamps: true
});

module.exports = model('review', reviewSchema);