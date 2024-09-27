const authHandler = require('../middlewares/authHandler');
const { Router } = require('express');
const router = Router();

const { createReport, getReports } = require('../controllers/report.controller');

router.route('/')
    .post(authHandler, createReport)
    .get(authHandler, getReports )

module.exports = router;