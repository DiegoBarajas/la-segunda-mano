const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { createReport } = require('../controllers/report.controller');

router.route('/')
    .post(authHandler, createReport)

module.exports = router;