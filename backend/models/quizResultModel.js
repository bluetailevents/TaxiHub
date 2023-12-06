const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    section: String,
    subsection: String,
    quizType: String,
    results: [{
    }]
});

const resultSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizzes: [quizSchema]
}, {
    timestamps: true,
});

module.exports = mongoose.model('QuizResults', resultSchema);
