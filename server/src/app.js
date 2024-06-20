const express = require('express');
const app = express();
require('dotenv').config();

const expressFileUpload = require('express-fileupload');
const petitionHandler = require('./middlewares/petitionHandler');
const errorHandler = require('./middlewares/errorHandler');

// Variables de servidor
app.set('PORT', process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(expressFileUpload());
app.use(petitionHandler);

// Routing
app.get('/', (req, res) => res.send('Hola Mundo') );


app.get('*', (req, res) => res.status(404).send('404: Ruta no encontrada') );

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;