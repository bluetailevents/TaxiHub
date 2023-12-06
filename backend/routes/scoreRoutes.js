// scoreRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getTestScores,
    setBeginnerScore,
    setIntermediateScore,
    setAdvancedScore,
    setFlashcardsScore,
} = require('../controllers/scoreController');

router.route('/').get(protect, getTestScores);
router.route('/beginner').post(protect, setBeginnerScore);
router.route('/intermediate').post(protect, setIntermediateScore);
router.route('/advanced').post(protect, setAdvancedScore);
router.route('/flashcards').post(protect, setFlashcardsScore);

module.exports = router;