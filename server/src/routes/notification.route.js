const { Router } = require('express');
const authHandler = require('../middlewares/authHandler');
const router = Router();

const { getAllNotifications, getNotificationsCounter } = require('../controllers/notification.controller')

router.route('/')
    .get(authHandler, getAllNotifications)

router.route('/counter')
    .get(authHandler, getNotificationsCounter)

module.exports = router;