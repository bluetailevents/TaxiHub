const express = require('express');
const router = express.Router();
const {
  fetchOpenAIData,
} = require('../controllers/openaiController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get( fetchOpenAIData);

module.exports = router;
