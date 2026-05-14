const SubscriptionModel = require("../models/subscription.model");
const AnnouncementModel = require('../models/announcement.model');

const Stripe = require('stripe');
const CustomError = require("../errors/CustomError");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

require('dotenv').config();
const controller = {};

controller.createSubscription = async(req, res, next) => {
        try{
//      Obtener el user desde el AuthMiddleware
        const { user, body } = req;
        const { announcementId } = body;
        
        // Verificar si el usuario es el mismo del anuncio
        const announcement = await AnnouncementModel.findById(announcementId);
        if(!user._id.equals(announcement.userId)){
            throw new CustomError('No eres dueño del anuncio, no puedes mejorarlo');
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: 'price_1TWqh4JCv3qocvfbPBNkbDsy',
                    quantity: 1
                }
            ],
            metadata: {
                userId: req.user._id.toString(),
                announcementId: announcementId
            },

            success_url: `${process.env.FRONTEND}/anuncio/${announcementId}?updated=true`,
            cancel_url: `${process.env.FRONTEND}/anuncio/${announcementId}`,
        });


//      Retornar la data importante
        res.json({
            url: session.url
        });

        
    }catch(err){
        next(err);
    }
}

module.exports = controller;