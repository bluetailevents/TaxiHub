// scoreController.js

const asyncHandler = require('express-async-handler');
const TestScore = require('../models/scoreModel');

// ...

// @desc    Set test score for beginner quiz
// @route   POST /api/testScores/beginner
// @access  Private
const setBeginnerScore = asyncHandler(async (req, res) => {
  const { scores } = req.body;

  const testScore = await TestScore.findOne({ user: req.user.id });

  if (!testScore) {
    testScore = new TestScore({ user: req.user.id });
  }

  testScore.beginnerScores = scores;
  await testScore.save();

  res.status(200).json(testScore);
});

// @desc    Get all test scores
// @route   GET /api/testScores
// @access  Private
const getTestScores = asyncHandler(async (req, res) => {
  const testScores = await TestScore.find({ user: req.user.id });

  res.status(200).json(testScores);
});



// @desc    Set test score for intermediate quiz
// @route   POST /api/testScores/intermediate
// @access  Private
const setIntermediateScore = asyncHandler(async (req, res) => {
  const { scores } = req.body;

  const testScore = await TestScore.findOne({ user: req.user.id });

  if (!testScore) {
    testScore = new TestScore({ user: req.user.id });
  }

  testScore.intermediateScores = scores;
  await testScore.save();

  res.status(200).json(testScore);
});

// @desc    Set test score for advanced quiz
// @route   POST /api/testScores/advanced
// @access  Private
const setAdvancedScore = asyncHandler(async (req, res) => {
  const { scores } = req.body;

  const testScore = await TestScore.findOne({ user: req.user.id });

  if (!testScore) {
    testScore = new TestScore({ user: req.user.id });
  }

  testScore.advancedScores = scores;
  await testScore.save();

  res.status(200).json(testScore);
});

// @desc    Set test score for flashcards
// @route   POST /api/testScores/flashcards
// @access  Private
const setFlashcardsScore = asyncHandler(async (req, res) => {
  const { scores } = req.body;

  const testScore = await TestScore.findOne({ user: req.user.id });

  if (!testScore) {
    testScore = new TestScore({ user: req.user.id });
  }

  testScore.flashcardScores = scores;
  await testScore.save();

  res.status(200).json(testScore);
});


module.exports = {
  getTestScores,
  setBeginnerScore,
  setIntermediateScore,
  setAdvancedScore,
  setFlashcardsScore,
};
