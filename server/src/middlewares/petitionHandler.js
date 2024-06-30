const colors = require('colors/safe');
const moment = require('moment-timezone');

module.exports = (req, res, next) => {
    const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

    console.log(colors.cyan(`${requestTime}    [ ${req.method} ] ${req.originalUrl}`));
    next();
}