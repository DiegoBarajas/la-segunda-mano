const colors = require('colors/safe');
const moment = require('moment-timezone');

// Exceptions
const UncompleteFieldsError = require('../errors/UncompleteFieldsError');
const CustomError = require('../errors/CustomError');

module.exports = (err, req, res, next) => {
    const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');

    console.log(colors.red(`${requestTime}    [ ${req.method}: ERROR ] ${req.url}:`))
    console.error(colors.red(err.stack), '\n');

    if(err instanceof UncompleteFieldsError) return res.status(400).send(err.message);
    if(err instanceof CustomError) return res.status(err.status).send(err.message);
    res.status(500).send('Algo salió mal');
}