const { Router } = require('express');

// controllers
const {
  createAutomation,
  getAllAutomations,
  startAutomation,
  stopAutomation,
} = require('../controllers/automationController');

const router = Router();

// puppeteer routes
router.route('/create').post(createAutomation);
router.route('/getAll').get(getAllAutomations);
router.route('/task/start').get(startAutomation);
router.route('/task/stop').get(stopAutomation);

module.exports = router;
