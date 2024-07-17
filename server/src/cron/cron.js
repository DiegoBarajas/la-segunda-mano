const cron = require('node-cron');
const colors = require('colors/safe');
const moment = require('moment-timezone');

const jobs = require('./cronJobs');

// Funcion de activación de cron
function cronStart(){
    const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
    console.log(colors.green(`${requestTime}    [   CRON   ] Servicio iniciado`));

    cron.schedule(`30 0 * * *`, () => asyncCronCallback(jobs.deleteAnnouncementsCaduced));
}

// Funcion de cron con el status
async function asyncCronCallback(callback){
    let requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
    const id = Date.now();

    console.log(colors.magenta(`\n${requestTime}    [   CRON   ] Tarea "${id}" iniciando ejecución...`));

    const task = await callback();

    requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
    console.log(colors.magenta(`${requestTime}    [   CRON   ] Tarea "${id}" ejecutada con exito!: \n  ${task}`));
}

module.exports = cronStart;
