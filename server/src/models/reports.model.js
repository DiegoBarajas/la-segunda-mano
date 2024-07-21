const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },

    tipo: { 
        type: String, 
        enum: ['vendedor', 'publicacion', "reseña"], 
        required: true 
    },

    reportedUserId: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    },
    
    reportedAnnouncementId: { 
        type: Schema.Types.ObjectId, 
        ref: "announcement", 
        default: null,
        required: false 
    },
    reportedReviewId: { 
        type: Schema.Types.ObjectId, 
        ref: "review", 
        default: null,
        required: false 
    },

    razon: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { 
        type: String, 
        default:'En revision', 
        enum: [ "En revision", "Anulada", "Aceptada y cerrada" ], 
        required: true 
    },

    fechaCreacion: { type: String, required: true },
    
    cerrado: { type: Boolean, required: false },
},{
    timestapms: true
});

module.exports = model('report', userSchema);