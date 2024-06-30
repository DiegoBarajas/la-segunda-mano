const colors = require('colors/safe');
const moment = require('moment-timezone');

module.exports = (req, res, next) => {
    console.log(colors.yellow(`[ RUTA NO ENCONTRADA ] [ ${req.method} ] ${req.originalUrl}`, '\n'));
    res.status(404).send(`404: Ruta [ ${req.originalUrl} ] no encontrada`);

    next();
}