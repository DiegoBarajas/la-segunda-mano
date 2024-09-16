const CustomError = require('../errors/CustomError');
const bannerModel = require('../models/banner.model');
const fs = require('fs');
const controller = {};

const announcementModel = require('../models/announcement.model')

controller.createBanner = async(req, res, next) => {
    try{ 
        const { body, files, user } = req;
        const { banner } = body;

        if(user.type !== 'admin') throw new CustomError("Acceso no autorizado.");
        if(!banner) throw new CustomError("Banner no enviado, favor de adjuntar una imagen.");

        const index = await bannerModel.countDocuments();

        const contentType = banner.split(';')[0].split(':')[1];
        const base64String = banner.split(',')[1];
        const bufferData = Buffer.from(base64String, 'base64');

        const newBanner = await new bannerModel({
            index,
            title: body.title,
            url: body.url,
            banner: {
                data: bufferData,
                contentType: contentType
            }
        }).save();

        res.send({ success: true });
        
    }catch(err){
        next(err);
    }
}

controller.getBanners = async (req, res, next) => {
    try {
        const banners = await bannerModel.find();    

        const response = banners.map(b => {
            const base64Image = b.banner.data.toString('base64');
            return {
                _id: b._id,
                index: b.index,
                title: b.title,
                url: b.url,
                data: `data:${b.banner.contentType};base64,${base64Image}`
            }
        })

        res.json(response);
    } catch (err) {
        next(err);
    }
};

controller.getBannerImg = async (req, res, next) => {
    try {
        const { id } = req.params;
        const banner = await bannerModel.findById(id);

        if (!banner) {
            return res.status(404).send('Banner not found');
        }

        // Establecer el tipo de contenido correcto para la imagen
        res.setHeader('Content-Type', banner.banner.contentType);

        // Enviar el Buffer de la imagen directamente
        res.send(banner.banner.data);

        fs.writeFileSync('tmp.webp', banner.banner.data)

    } catch (err) {
        next(err);
    }
};

controller.deleteBanner = async(req, res, next) => {
    try{ 
        const { params, user } = req;
        if(user.type !== 'admin') throw new CustomError("Acceso no autorizado.");

        await bannerModel.findByIdAndDelete(params.id);

        res.send({ success: true });
    }catch(err){
        next(err);
    }
}


module.exports = controller;