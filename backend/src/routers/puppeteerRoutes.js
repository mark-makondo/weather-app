const { Router } = require('express');

// controllers
const { scrapeApi, apis, specificApi } = require('../controllers/apiController');

const router = Router();

// puppeteer routes
router.route('/scrape/api/docs?:name').get(scrapeApi);
router.route('/saved/apis').get(apis);
router.route('/saved/specific-api?:id').get(apis);

module.exports = router;
