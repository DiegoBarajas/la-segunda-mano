const express = require('express');
const cloudinary = require('cloudinary').v2;
const helmet = require('helmet');
const cors = require('cors');
const app = express();
require('dotenv').config();

const expressFileUpload = require('express-fileupload');
const petitionHandler = require('./middlewares/petitionHandler');
const notFoundhandler = require('./middlewares/notFoundHandler');
const errorHandler = require('./middlewares/errorHandler');

// Variables de servidor
app.set('PORT', process.env.PORT || 4000);

// Cloudinary config
cloudinary.config({ 
    cloud_name: 'dzl8owvgs', 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middlewares
app.use(express.json());
app.use(helmet())
app.use(cors());
app.use(expressFileUpload(
    { useTempFiles: true, limits: {fileSize: 50 * 2024 * 1024} })
);
app.use(petitionHandler);


// Routing
app.get('/', (req, res) => res.send('Hola Mundo') );

app.use('/api/announcement', require('./routes/announcement.route'));
app.use('/api/favorite', require('./routes/favorite.route'));
app.use('/api/review', require('./routes/review.route'));
app.use('/api/report', require('./routes/report.route'));
app.use('/api/login', require('./routes/login.route'));
app.use('/api/user', require('./routes/user.route'));



app.use('*', notFoundhandler);

// Middleware para manejo de errores
app.use(errorHandler);

module.exports = app;