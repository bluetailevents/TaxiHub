const express = require('express')
const router = express.Router()
const {
    getQuizResults,
    createQuizResults,
} = require('../controllers/quizResultController')

const { protect } = require('../middleware/authMiddleware')
router.route('/:id').get(protect, getQuizResults).post(protect, createQuizResults);
module.exports = router
