const authHandler = require('../middlewares/authHandler');
const authHandlerNoExtrict = require('../middlewares/authHandlerNoExtrict');
const { Router } = require('express');
const router = Router();

const { createReview, deleteReview, recomendReview, getReviewsBySellerId } = require('../controllers/review.controller');

router.route('/')
    .post(authHandler, createReview)

router.route('/seller/:id')
    .get(authHandlerNoExtrict, getReviewsBySellerId)

router.route('/:id')
    .delete(authHandler, deleteReview)
    .patch(authHandler, recomendReview)

module.exports = router;