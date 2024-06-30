module.exports = class MailerError extends Error {
    constructor(message){
        super(message);
        this.name = 'MailerError';
    }
}