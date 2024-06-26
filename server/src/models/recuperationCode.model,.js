const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true,
        unique: true
    },
    codigo: { type: String, required: true, expires: 3600}
},{
    timestapms: true
});

module.exports = model('User', userSchema);