const mongoose = require('mongoose');

const openaiSchema = mongoose.Schema(
  {
    conversation: {
      type: Array,
      required: true,
    },
    response: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('OpenAI', openaiSchema);
