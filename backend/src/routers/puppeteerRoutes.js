const { Router } = require('express');

// controllers
const { start, getApi } = require('../controllers/puppeteerController');

const router = Router();

// puppeteer routes
router.route('/start').get(start);
router.route('/weather/doc/api').get(getApi);

module.exports = router;
