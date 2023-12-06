const express = require('express');
const router = express.Router();
const {
  createBusiness,
  fetchBusinessData,
  fetchaBusinessData,
  updateBusiness,
  deleteBusiness,
} = require('../controllers/businessController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').post(createBusiness).get(fetchBusinessData);
router.route('/:id').put( updateBusiness).delete( deleteBusiness).get(fetchaBusinessData);

module.exports = router;

