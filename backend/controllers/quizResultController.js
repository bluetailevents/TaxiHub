const asyncHandler = require('express-async-handler')

const QuizResults = require('../models/quizResultModel')
const User = require('../models/userModel')

// @desc    Get quiz results for a user
// @route   GET /api/quizResults/:userId
// @access  Private
const getQuizResults = asyncHandler(async (req, res) => {
  const quizResults = await QuizResults.find({ user: req.user.id }) // Use find instead of findOne

  if (!quizResults) {
    res.status(404)
    throw new Error('Quiz results not found')
  }
  console.log('Quiz results found:', quizResults);

  res.status(200).json(quizResults)
})


// @desc    Create quiz results for a user
// @route   POST /api/quizResults/:userId
// @access  Private
const createQuizResults = asyncHandler(async (req, res) => {
  console.log('Received request to create quiz results');
  console.log('Request body:', req.body);

  const user = await User.findById(req.user.id)

  if (!user) {
    console.log('User not found');
    res.status(404)
    throw new Error('User not found')
  }

  // Create a new QuizResults document using the request body
  const quizResults = new QuizResults({
    user: req.user.id,
    quizzes: req.body.quizzes,
  });

  // Save the QuizResults document to the database
  const createdQuizResults = await quizResults.save();

  // Send the created QuizResults document as a response
  res.status(201).json(createdQuizResults);
});




module.exports = {
  getQuizResults,
  createQuizResults,
}
