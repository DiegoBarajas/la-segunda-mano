const { Router } = require('express');
const authHandler = require('../middlewares/authHandler');
const router = Router();

const { createBanner, getBanners, getBannerImg, deleteBanner } = require('../controllers/banner.controller')

router.route('/')
    .post(authHandler, createBanner)
    .get(getBanners)

router.route('/:id')
    .delete(authHandler, deleteBanner)

router.route('/img/:id')
    .get(getBannerImg)

module.exports = router;