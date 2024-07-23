const app = require('./app.js');
const colors = require('colors/safe');
const moment = require('moment-timezone');
const startCron = require('./cron/cron.js');

async function main(){
    const PORT = app.get('PORT');
    require('./database');
    
    app.listen(PORT, async() => {
        const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
        
        console.clear();
        console.log(colors.green(`${requestTime}    [  SERVER  ] Servidor lanzado en el puerto: ${PORT}`));
        startCron();
    });
}

main();