const express = require('express');
const app = express();
require('dotenv').config();

const expressFileUpload = require('express-fileupload');
const apiLogsMiddleware = require('./middlewares/apiLogs.middleware');
const errorsMiddleware = require('./middlewares/errors.middleware');

// Variables de servidor
app.set('PORT', process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(expressFileUpload());
app.use(apiLogsMiddleware);
app.use(errorsMiddleware);

// Routing
app.get('/', (req, res) => res.send('Hola Mundo') );



app.get('*', (req, res) => res.status(404).send('404: Ruta no encontrada') );

module.exports = app;