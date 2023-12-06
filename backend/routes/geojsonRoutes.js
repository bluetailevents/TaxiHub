const express = require('express');
const router = express.Router();

const { getGeoJson } = require('../controllers/geojsonController');

router.route('/').get(getGeoJson);

module.exports = router;