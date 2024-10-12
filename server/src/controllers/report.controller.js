const ReportModel = require('../models/reports.model');
const announcementModel = require('../models/announcement.model');
const moment = require('moment-timezone');
const userModel = require('../models/user.model');
const reviewModel = require('../models/review.model');
const mailer = require('../mailer');
const controller = {};

// Generar reporte
controller.createReport = async(req, res, next) => {
    try{
        const { user, body } = req;
        const { razon, tipo, descripcion, id, } = body;

        let reportedUserId = null;
        let reportedAnnouncementId = null;
        let reportedReviewId = null;
        switch(tipo) {
            case "reseña": 
                    const review = await reviewModel.findById(id);
                    reportedUserId = review.authorId;
                    reportedReviewId = id;
                break;
                
            case "publicacion":
                    const announcement = await announcementModel.findById(id);
                    reportedUserId = announcement.userId;
                    reportedAnnouncementId = id;
                break;

            case "vendedor":
                    const user = await userModel.findOne({ sellerId: id });
                    reportedUserId = user._id;
                break;
            
            
            default: null;
        }

        const newReport = await new ReportModel({
            userId: user._id,
            razon, 
            tipo,
            descripcion,

            reportedUserId,
            reportedReviewId,
            reportedAnnouncementId,

            fechaCreacion: moment().tz('America/Mexico_City').format('DD-MM-YYYY')
        }).save();

        mailer.sendMailTemplate(user.correo, "Gracias por contribuir", 'new-report', { nombre: user.nombre.split(' ')[0], id: newReport._id })

        res.send(newReport);
    }catch(err){
        next(err);
    }
}

controller.getReports = async(req, res, next) => {
    try{
        const { query } = req;
        const page = query.page ? (query.page-1) * 20 : 0;    
        const filter = {};
        let sort = {}

        console.log(query);
        if(query.search){
            const regex = new RegExp(query.search, 'i'); // Crea la expresión regular

            filter.$or = [
                { razon: { $regex: regex } }
            ]
        }

        if(query.estado){
            filter.estado = query.estado;
        }if(query.tipo){
            filter.tipo = query.tipo;
        }

        if(query.ordenar == 'new'){
            sort = { createdAt: 1 };
        }

        console.log(sort);
        

        const reports = await ReportModel.find(filter).skip(page).limit(20).sort(sort);
        const totalReports = await ReportModel.countDocuments(filter);

        res.send({reports, totalReports});
    }catch(err){
        next(err);
    }
}

module.exports = controller;