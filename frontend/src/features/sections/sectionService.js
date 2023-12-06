import axios from 'axios'

const API_URL = 'http://localhost:5000/api/sections/'

// Get sections
const getSections = async (token) => {
    const config = {
        headers: {
        Authorization: `Bearer ${token}`,
        },
    }

    const response = await axios.get(API_URL, config)
    return response.data
    
}

const sectionService = {
    getSections,
}

export default sectionService
