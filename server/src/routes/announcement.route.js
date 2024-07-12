const authHandler = require('../middlewares/authHandler');
const authHandlerNoExtrict = require('../middlewares/authHandlerNoExtrict')
const { Router } = require('express');
const router = Router();

const { createAnnouncement, getAnnouncement } = require('../controllers/announcement.controller');

router.route('/')
    .post(authHandler, createAnnouncement)

router.route('/:id')
    .get(authHandlerNoExtrict, getAnnouncement)


module.exports = router;