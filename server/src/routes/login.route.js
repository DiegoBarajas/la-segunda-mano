const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { login, signin, protected, sendMail } = require('../controllers/user.controller');

router.route('/')
    .post(login)
    .get(authHandler, protected)

router.route('/signin')
    .post(signin)

module.exports = router;