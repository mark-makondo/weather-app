const { Router } = require('express');

// controllers
const puppeteerController = require('../controllers/puppeteerController');

const router = Router();

// puppeteer routes
router.route('/start').get(puppeteerController.start);

module.exports = router;
