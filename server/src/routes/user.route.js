const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { getUser, updateUser, getPermiso } = require('../controllers/user.controller');

router.route('/')
    .get(authHandler, getUser)
    .patch(authHandler, updateUser)

router.route('/permiso')
    .get(authHandler, getPermiso)

module.exports = router;