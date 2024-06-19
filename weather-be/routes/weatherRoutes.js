const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
const weatherProxy = require('../middleware/proxy');

router.get('/history', weatherController.getHistory);

router.get('/city/:city', weatherProxy, weatherController.saveWeatherData);

module.exports = router;
