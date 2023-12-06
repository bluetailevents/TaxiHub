const asyncHandler = require('express-async-handler');
const OpenAI = require('../models/openaiModel');
const axios = require('axios');

const generateOpenAIResponse = async (conversation) => {
  const openaiEndpoint = 'https://api.openai.com/v1/engines/gpt-3.5-turbo/completions'; // Update endpoint
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const response = await axios.post(
      openaiEndpoint,
      {
        prompt: conversation.join('\n'),
        max_tokens: 50, // Adjust as needed
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error generating OpenAI response:', error.message);
    return 'Error generating response';
  }
};

// Fetch OpenAI data and save conversation
const fetchOpenAIData = asyncHandler(async (req, res) => {
  const { conversation } = req.body;

  // Generate response from OpenAI using conversation
  const response = await generateOpenAIResponse(conversation);

  // Save the conversation and response to the database
  const openAIRecord = await OpenAI.create({ conversation, response });

  res.json(openAIRecord);
});

module.exports = { fetchOpenAIData };
