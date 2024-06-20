const mongoose = require('mongoose');
const colors = require('colors/safe');
const moment = require('moment-timezone');
require('dotenv').config();

const URI = process.env.MONGODB_URI
            ? process.env.MONGODB_URI
            : 'mongodb://127.0.0.1:27017/la-segunda-mano-dev';

mongoose.connect(URI);

const connetion = mongoose.connection;
connetion.once('open', ()=>{
    const terminalWidth = process.stdout.columns;
    const line = '-'.repeat(terminalWidth);
    const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

    console.log(colors.green(`${requestTime}    [ DATABASE ] Base de datos conectada exitosamente`));
    console.log(colors.green(line)+'\n');
});