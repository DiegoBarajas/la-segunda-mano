const authHandler = require('../middlewares/authHandler');
const authHandlerNoExtrict = require('../middlewares/authHandlerNoExtrict')
const { Router } = require('express');
const router = Router();

const { createAnnouncement, getAnnouncement, getAnnouncementByToken, getAnnouncementBySearch } = require('../controllers/announcement.controller');

router.route('/')
    .post(authHandler, createAnnouncement)
    .get(getAnnouncementBySearch)

router.route('/:id')
    .get(authHandlerNoExtrict, getAnnouncement)

router.route('/user/token')
    .get(authHandler, getAnnouncementByToken)

module.exports = router;