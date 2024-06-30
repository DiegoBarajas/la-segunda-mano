const MailerError = require('./errors/MailerError');
const nodemailer = require('nodemailer');
const moment = require('moment-timezone');
const colors = require('colors/safe');
require('dotenv').config();

class Mailer{

    #transporter = nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true,
        tls: true,
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.PASS_EMAIL,
        }
    });
      
    async sendMail(to, subject, text, html=null){
        try{
            let requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
            console.log(colors.blue(`${requestTime}    [ EMAIL ] Enviando correo electronico`));

            const info = await this.#transporter.sendMail({
                from:`No-Contestar <${process.env.USER_EMAIL}>`,
                to,
                subject,
                text,
                html: (html ? html : `<p>${text}</p>`),
            });

            requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
            console.log(colors.blue(`${requestTime}    [ EMAIL ] Correo electronico enviado exitosamente`));
            return info;

        }catch(err){
            const requestTime = moment().tz('America/Mexico_City').format('DD-MM-YYYY HH:mm:ss');
            console.log(colors.red(`${requestTime}    [ EMAIL ] Error al enviar el correo:`));
            console.error(colors.red(err));
            
            throw new MailerError('Error al enviar el correo');
        }
    }
}

module.exports = new Mailer();