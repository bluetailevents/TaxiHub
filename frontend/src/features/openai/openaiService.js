import axios from 'axios';

const API_URL = '/api/openai/';

const fetchOpenAIData = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const openaiService = {
  fetchOpenAIData,
};

export default openaiService;
