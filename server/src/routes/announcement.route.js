const authHandler = require('../middlewares/authHandler');
const authHandlerNoExtrict = require('../middlewares/authHandlerNoExtrict')
const { Router } = require('express');
const router = Router();

const { createAnnouncement, getAnnouncement, getAnnouncementByToken, getAnnouncementBySearch, deleteMyAnnoucement, iHadSelledMyAnnoucement, getAnnouncementBySellerId, getAnnouncementProtected, editAnnouncement, getPaymentIntent, upgradeAnnoncement } = require('../controllers/announcement.controller');

router.route('/')
    .post(authHandler, createAnnouncement)
    .get(getAnnouncementBySearch)

router.route('/:id')
    .get(authHandlerNoExtrict, getAnnouncement)
    .patch(authHandler, editAnnouncement)
    .delete(authHandler, deleteMyAnnoucement)

router.route('/upgrade/:id')
    .get(getPaymentIntent)
    .patch(upgradeAnnoncement)

router.route('/:id/protected')
    .get(authHandler, getAnnouncementProtected)

router.route('/selled/:id')
    .delete(authHandler, iHadSelledMyAnnoucement)

router.route('/user/token')
    .get(authHandler, getAnnouncementByToken)

router.route('/seller/:id')
    .get(getAnnouncementBySellerId)

module.exports = router;