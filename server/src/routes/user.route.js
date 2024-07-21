const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { getUser, updateUser } = require('../controllers/user.controller');

router.route('/')
    .get(authHandler, getUser)
    .patch(authHandler, updateUser)

module.exports = router;