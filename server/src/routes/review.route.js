const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { createReview, deleteReview } = require('../controllers/review.controller');

router.route('/')
    .post(authHandler, createReview)

router.route('/:id')
    .delete(authHandler, deleteReview)

module.exports = router;