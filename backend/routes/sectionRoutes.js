const express = require('express')
const router = express.Router()
const {
  getSections,
} = require('../controllers/sectionController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getSections)

module.exports = router
