const colors = require('colors/safe');
const moment = require('moment-timezone');

module.exports = (err, req, res, next) => {
    const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

    console.error(colors.red(`${requestTime}    [ ERROR ] `)+red(err));
    res.status(500).send('Algo salió mal');
}