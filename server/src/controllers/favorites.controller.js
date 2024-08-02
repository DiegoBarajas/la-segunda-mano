const FavoriteModel = require('../models/favorite.model');
const AnnouncementModel = require('../models/announcement.model');

const controller = { };

// Agregar a favoritos
controller.addToFavorite = async(req, res, next) => {
    try{
//      Obtener la data del req y el usuario autenticado
        const { user, body } = req;
        const { announcementId } = body;

//      Comprobar si existe ya el registro
        const favorite = await FavoriteModel.findOne({ userId: user._id, announcementId });

//      Si existe eliminarlo
        if(favorite){
            await FavoriteModel.findByIdAndDelete(favorite._id);
            return res.send({ message: "Anuncio removido de favoritos", isOn: false })
        }

//      Crear registro
        await new FavoriteModel({
            userId: user._id,
            announcementId
        }).save();

//      Enviar respuesta
        res.send({ message: "Anuncio agregado a favoritos!", isOn: true })
    }catch(err){
        next(err);
    }
}

// Obtener favoritos
controller.getFavorits = async(req, res, next) => {
    try{
//      Obtener el usuario autenticado
        const { user } = req;

//      Obtener los favoritos si existe ya el registro
        const favorites = await FavoriteModel.find({ userId: user._id })
            .sort({ createdAt: -1 })
            .populate('announcementId');

//      Obtener la información de los favoritos
        const anns = favorites.map((f) => {
            if(!f.announcementId) return null;
            const element = f.announcementId.toJSON();
            element.nivel = 'estandar';

            return element;
        })

//      Parsear respuesta
        const resp = anns.filter(element => element !== null);


//      Enviar respuesta
        return res.send(resp);
    }catch(err){
        next(err);
    }
}

module.exports = controller;
