const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { login, forgot, forgotCode, forgotResend, signin, siginCode, signinResend, signinLastSteps } = require('../controllers/user.controller');

router.route('/')
    .post(login)

router.route('/forgot')
    .post(forgot)
    .patch(forgotCode)

router.route('/forgot/resend')
    .post(forgotResend)

router.route('/signin')
    .post(signin)
    .patch(siginCode)

router.route('/signin/resend')
    .post(signinResend)

router.route('/signin/last')
    .patch(authHandler, signinLastSteps)

module.exports = router;