const colors = require('colors/safe');
const moment = require('moment-timezone');

module.exports = (req, res, next) => {
    const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
    const ip = req.ip || req.connection.remoteAddress;

    console.log('\n', colors.cyan(`${requestTime}    [ ${req.method} ] ${ip} - ${req.originalUrl}`));
    next();
}