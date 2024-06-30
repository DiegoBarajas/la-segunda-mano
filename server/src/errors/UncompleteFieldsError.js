module.exports = class UncompleteFieldsError extends Error{
    constructor(fields){
        let message = `Se requireren los campos: `
        fields.forEach((field, index) => {
            if((index+1 == fields.length) && fields.length > 1) return message += ` Y "${field}"`
            else if(index+1 == fields.length) return message += `"${field}"`
            else if(index+2 == fields.length) return message += `"${field}" `
            message += `"${field}", `
        });
        message += '.';
        
        super(message);
        this.name = "UncompleteFieldsError";
    }
}