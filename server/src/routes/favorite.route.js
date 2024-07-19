const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { getFavorits, addToFavorite } = require('../controllers/favorites.controller');

router.route('/')
    .get(authHandler, getFavorits)
    .post(authHandler, addToFavorite)

module.exports = router;