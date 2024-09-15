const { Router } = require('express');
const router = Router();

const { getPremiumAnnouncements, getRecentAnnouncements } = require('../controllers/index.controller');

router.route('/premium')
    .get(getPremiumAnnouncements)

router.route('/reciente')
    .get(getRecentAnnouncements)

module.exports = router;
