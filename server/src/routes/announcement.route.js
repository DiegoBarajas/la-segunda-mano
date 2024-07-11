const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { createAnnouncement, getAnnouncement } = require('../controllers/announcement.controller');

router.route('/')
    .post(authHandler, createAnnouncement)

router.route('/:id')
    .get(getAnnouncement)


module.exports = router;