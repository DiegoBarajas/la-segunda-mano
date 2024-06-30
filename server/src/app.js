const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();

const expressFileUpload = require('express-fileupload');
const petitionHandler = require('./middlewares/petitionHandler');
const notFoundhandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

// Variables de servidor
app.set('PORT', process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(cors());
app.use(expressFileUpload());
app.use(petitionHandler);

// Servir los archivos estáticos de la carpeta build de React
app.use(express.static(path.join(__dirname, '../../build')));

// Routing
app.get('/api', (req, res) => res.send('Hola Mundo') );

app.use('/api/login', require('./routes/login.route'));

// app.use('*', notFoundhandler);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;