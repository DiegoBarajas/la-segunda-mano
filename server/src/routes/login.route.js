const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { login, forgot, forgotCode, signin, siginCode } = require('../controllers/user.controller');

router.route('/')
    .post(login)

router.route('/forgot')
    .post(forgot)

router.route('/forgot/code')
    .post(forgotCode)

router.route('/signin')
    .post(signin)

router.route('/signin/code')
    .post(siginCode)

module.exports = router;