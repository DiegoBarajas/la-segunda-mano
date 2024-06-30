const express = require('express');
const app = express();

const cors = require('cors');
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

// Routing
app.get('/', (req, res) => res.send('Hola Mundo') );

app.use('/api/login', require('./routes/login.route'));

app.use('*', notFoundhandler);

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;