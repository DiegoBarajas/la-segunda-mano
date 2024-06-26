const { Schema, model } = require('mongoose');

const commentSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true 
    },
    commentedUserId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true 
    },

    contenido: { type: String, required: true },
    fechaCreacion: { type: Date, required: true },
    importancia: { type: Number, default: 0, required: true }
}, {
    timestamps: true
});

module.exports = model('Comment', commentSchema);