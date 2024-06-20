const colors = require('colors/safe');
const moment = require('moment-timezone');

module.exports = (err, req, res, next) => {
    const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

    console.log(colors.red(`${requestTime}    [ ERROR: ${req.method} ] ${req.url}:`))
    console.error(colors.red(err.stack), '\n')
    res.status(500).send('Algo salió mal');
}