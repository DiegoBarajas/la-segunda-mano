const announcementsModel = require('../models/announcement.model');
const controller = {};

controller.getPremiumAnnouncements = async(req, res, next) => {
    try{

        const premiumAnns = await announcementsModel.aggregate([
            { $match: { nivel: 'premium' } },
            { $sample: {size: 10} }
        ]);

        res.send(premiumAnns);

    }catch(err) {
        next(err);
    }
}

controller.getRecentAnnouncements = async(req, res, next) => {
    try{

        const recentAnns = await announcementsModel.find()
            .sort({ createdAt: -1 })
            .limit(20);

        res.send(recentAnns);

    }catch(err) {
        next(err);
    }
}

module.exports = controller;