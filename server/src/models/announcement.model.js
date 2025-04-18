const { Schema, model } = require('mongoose');

const announcementSchema = new Schema({
    
    userId: { //
        type: Schema.Types.ObjectId, 
        ref: "user", 
        required: true 
    }, 
    titulo: { //
        type: String, 
        required: true 
    },
    precio: { //
        type: String, 
        default: null,
        required: true
    }, 
    descripcion: { //
        type: String, 
        required: true 
    }, 
    tipoAnuncio: { //
        type: String, 
        required: true,
        enum: [ "producto", "vehiculo", "inmueble", "gratis", "servicio" ], 
    }, 
    categoria: { //
        type: String, 
        required: true 
    },
    imagenes: { //
        type: [String],
        required: true
    },


    caracteristicas: { 
        // Principales
        uso: { type: String, default: null, required: false },//
        ciudad: { type: String, required: true },//
        estado: { type: String, required: true },//
        cantidad: { //
            type: Number, 
            min: [1, "La cantidad debe ser mayor a 1"], 
            default: 1
        },
        marca: { type: String, default: null, required: false },//
        modelo: { type: String, default: null, required: false },//
        color: { type: String, default: null, required: false },//
        tipo: { type: String, default: null, required: false },//

        // Alimentos y bebidas
        fechaCaducidad: { type: String, default: null, required: false },//
        ingredientes: { type: String, default: null, required: false },//

        // Autopartes
        vehiculo: { type: String, default: null, required: false },//

        // Computación y telefonía
        cpu: { type: String, default: null, required: false },//
        ram: { type: String, default: null, required: false },//
        almacenamiento: { type: String, default: null, required: false },//
        bateria: { type: String, default: null, required: false },//
        sistemaOperativo: { type: String, default: null, required: false },//
        conectividad: { type: String, default: null, required: false },//
        tamañoPantalla: { type: String, default: null, required: false },//

        // Libros, películas y música
        autor: { type: String, default: null, required: false },//
        editorial: { type: String, default: null, required: false },//
        director: { type: String, default: null, required: false },//
        artista: { type: String, default: null, required: false },//
        genero: { type: String, default: null, required: false },//
        idioma: { type: String, default: null, required: false },//
        duracion: { type: String, default: null, required: false },//

        // Ropa y calzado
        talla: { type: String, default: null, required: false },//
        sexo: { type: String, default: null, required: false },//
        material: { type: String, default: null, required: false },//

        // TV y pantallas
        resolucion: { type: String, default: null, required: false },//
        tamañoPulgadas: { type: String, default: null, required: false },//
        smartTV: { type: Boolean, default: null, required: false },//
        conectividadTV: { type: String, default: null, required: false },//

        // Vehiculo
        año: { type: Number, required: false }, //
        kilometraje: { type: Number, default: null, required: false }, //
        deudas: { type: Boolean, default: null, required: false }, //
        cilindros: { type: Number, default: null, required: false }, //

        // Inmuebles
        rentaOVenta: { type: String, enum: ['renta', 'venta'], required: false }, //
        superficie: { type: Number, default: null, required: false }, //
        colonia: { type: String, default: null, required: false },
        cp: { type: Number, default: null, required: false }, //
        baños: { type: Number, default: null, required: false }, //
        habitaciones: { type: Number, default: null, required: false }, //
    },

    // Contacto
    contacto: {
        type: [{
            tipo: { type: String, enum: ['phone', 'email', 'whatsapp'], required: true},
            contenido: { type: String, required: true },
        }],
        validate: {
            validator: function(array) {
              return array.length >= 1;
            },
            message: 'Debe haber al menos un medio de contacto'
        },
        required: true
    },

    // Formas entrega
    formasEntrega: {
        type: [{
            forma: { type: String, required: true },
            detalles: { type: String, default: null, required: false },
        }],
        default: null,
        required: false
    },

    // Fechas
    fechaCreacion: { type: String, required: true },
    fechaExpiracion: { type: String, required: true },

    // Tier del anuncio
    nivel: {
        type: String,
        enum: [ "estandar", "impulsado", "premium" ],
        default: 'estandar',
        required: true
    },

    // Historial de mejoras
    mejoras: [
        {
            nivel: {
                type: String,
                enum: [  "impulsado", "premium" ],
                required: true
            },
            fechaInicio: { type: String, required: true },
            fechaFin: { type: String, required: true },
            intentId: { type: String, required: true },
        }
    ]
},{
    timestamps: true
});

module.exports = model('announcement', announcementSchema);