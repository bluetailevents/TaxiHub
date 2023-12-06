const asyncHandler = require('express-async-handler');
const Business = require('../models/businessModel');

// @desc    Create a new business
// @route   POST /api/business
// @access  Private
const createBusiness = asyncHandler(async (req, res) => {
  const { name, industry, revenue } = req.body;

  const business = await Business.create({
    name,
    industry,
    revenue,
    // Add any other fields you need to save
  });

  if (business) {
    res.status(201).json(business);
  } else {
    res.status(400);
    throw new Error('Invalid business data');
  }
});

// @desc    Fetch all businesses
// @route   GET /api/business
// @access  Private
const fetchBusinessData = asyncHandler(async (req, res) => {
  const businesses = await Business.find();
  res.status(200).json(businesses);
});

// @desc    Update a business
// @route   PUT /api/business/:id
// @access  Private
const updateBusiness = asyncHandler(async (req, res) => {
  const { name, industry, revenue } = req.body;

  const business = await Business.findById(req.params.id);

  if (business) {
    business.name = name || business.name;
    business.industry = industry || business.industry;
    business.revenue = revenue || business.revenue;

    const updatedBusiness = await business.save();
    res.status(200).json(updatedBusiness);
  } else {
    res.status(400);
    throw new Error('Business not found');
  }
});

// @desc    Delete a business
// @route   DELETE /api/business/:id
// @access  Private
const deleteBusiness = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);

  if (business) {
    await business.remove();
    res.status(200).json({ message: 'Business removed' });
  } else {
    res.status(400);
    throw new Error('Business not found');
  }
});

// @desc    Fetch a business
// @route   GET /api/business/:id
// @access  Private
const fetchaBusinessData = asyncHandler(async (req, res) => {
  const business = await Business.findById(req.params.id);
  if (business) {
    res.status(200).json(business);
  } else {
    res.status(400);
    throw new Error('Business not found');
  }
});

module.exports = {
  createBusiness,
  fetchBusinessData,
  updateBusiness,
  deleteBusiness,
  fetchaBusinessData,
};
