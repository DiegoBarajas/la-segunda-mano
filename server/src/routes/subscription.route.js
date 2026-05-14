const { Router } = require('express');
const router = Router();

const authHandler = require('../middlewares/authHandler');
const { createSubscription } = require('../controllers/subscription.controller');

router.route('/create')
    .post(authHandler, createSubscription)


module.exports = router;
