const { Router } = require('express');

// controllers
const { createAutomation, getAllAutomations } = require('../controllers/automationController');

const router = Router();

// puppeteer routes
router.route('/create').post(createAutomation);
router.route('/getAll').get(getAllAutomations);

module.exports = router;
