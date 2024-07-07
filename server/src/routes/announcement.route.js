const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { createAnnouncement } = require('../controllers/announcement.controller');

router.route('/')
    .post(authHandler, createAnnouncement)


module.exports = router;