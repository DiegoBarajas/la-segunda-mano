const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { getUser } = require('../controllers/user.controller');

router.route('/')
    .get(authHandler, getUser)

module.exports = router;