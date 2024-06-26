const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true 
    }, 
    announcementId: { 
        type: Schema.Types.ObjectId, 
        rel: "Announcement", 
        default: null,
        required: false 
    },
    expiro: { type: Boolean, default: false },
    mensaje: { type: String, required: true },
},{
    timestapms: true
});

module.exports = model('Favorite', favoriteSchema);