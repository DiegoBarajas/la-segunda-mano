const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    }, 
    announcementId: { 
        type: Schema.Types.ObjectId, 
        ref: "announcement", 
        default: null,
        required: false 
    }
},{
    timestamps: true
});

module.exports = model('favorite', favoriteSchema);