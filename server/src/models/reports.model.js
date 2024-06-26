const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true 
    },

    tipo: { type: String, enum: ['usuario', 'publicacion'], required: true },

    reportedUserId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true 
    },
    reportedAnnouncementId: { 
        type: Schema.Types.ObjectId, 
        rel: "Announcement", 
        default: null,
        required: false 
    },

    descripcion: { type: String, required: true },
    estado: { type: String, required: true },
    fechaCreacion: { type: Date, required: true },
    
    cerrado: { type: Boolean, required: false },
},{
    timestapms: true
});

module.exports = model('Report', userSchema);