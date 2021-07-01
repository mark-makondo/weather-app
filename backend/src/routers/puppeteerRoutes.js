const { Router } = require('express');

// controllers
const { start, getApi } = require('../controllers/puppeteerController');

const router = Router();

// puppeteer routes
router.route('/start-browser').get(start);
router.route('/scrape/open-weather/docs/api').get(getApi);

module.exports = router;
