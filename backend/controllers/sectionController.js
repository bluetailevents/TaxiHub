const asyncHandler = require('express-async-handler')

const Section = require('../models/sectionModel')
const User = require('../models/userModel')

// @desc    Get sections
// @route   GET /api/sections
// @access  Private
const getSections = asyncHandler(async (req, res) => {
    const sectionsData = await Section.find({})
    const sectionNames = ['section1', 'section2', 'section3', 'section4', 'section5'];
    const sections = sectionsData.map(sectionData => {
    const section = sectionData.toObject(); // Convert the document to a plain JavaScript object
    const sectionName = Object.keys(section).find(key => sectionNames.includes(key));
        return {
            _id: section._id,
            name: sectionName,
            ...section[sectionName], // Include the rest of the section data
        };
        });
        res.status(200).json(sections);
    })

    
    

module.exports = {
    getSections,
}
