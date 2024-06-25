const { Schema, model } = require('mongoose');

const announcementSchema = new Schema({
    
    userId: { 
        type: Schema.Types.ObjectId, 
        rel: "User", 
        required: true 
    }, 
    title: { 
        type: String, 
        required: true 
    },
    price: { 
        type: Number, 
        min: [1, "El precio debe de ser entero"] ,
        required: true
    }, 
    description: { 
        type: String, 
        required: true 
    }, 
    type: { 
        type: String, 
        required: true,
        enum: ["producto", "vehiculo", "inmueble"], 
    }, 
    category: { 
        type: String, 
        enum: [], 
        required: true 
    },


    characteristics: { 
        // Main
        usage: { type: String, required: true },
        city: { type: String, required: true },
        quantity: { 
            type: Number, 
            min: [1, "La cantidad debe ser mayor a 1"], 
            default: 1, 
            required: true
        },
        state: { type: String, required: true },
        brand: { type: String, default: null, required: false },
        model: { type: String, default: null, required: false },
        color: { type: String, default: null, required: false },

    },

    // Dates
    createdDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },

},{
    timestapms: true
});

module.exports = model('Announcement', announcementSchema);