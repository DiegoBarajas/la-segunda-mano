const { model, Schema } = require('mongoose');

const schema = new Schema({
    index: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    url: { type: String, required: false, default: null },
    banner: {
        data: { type: Buffer, required: true }, 
        contentType: { type: String, required: true }
    }
}, {
    timestamps: true
})

module.exports = model("banner", schema);
