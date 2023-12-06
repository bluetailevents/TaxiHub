// testScoreSchema.js

const mongoose = require('mongoose');

const scoreSchema = mongoose.Schema(
    {
        beginnerScores: {
        type: Map,
        of: Number,
        },
        intermediateScores: {
        type: Map,
        of: Number,
        },
        advancedScores: {
        type: Map,
        of: Number,
        },
        flashcardScores: {
        type: Map,
        of: Number,
        },
        // You can add more fields as needed
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Score', scoreSchema);
