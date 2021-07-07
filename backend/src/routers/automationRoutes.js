const { Router } = require('express');

// controllers
const { createAutomation } = require('../controllers/automationController');

const router = Router();

// puppeteer routes
router.route('/create').post(createAutomation);

module.exports = router;
