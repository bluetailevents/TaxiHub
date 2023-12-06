const asyncHandler = require('express-async-handler')

const GeoJson = require('../models/geojsonModel')

// @desc    Get geojson
// @route   GET /api/geojson
// @access  Private

const getGeoJson = asyncHandler(async (req, res) => {
    const geojson = await GeoJson.find({})
    
    res.status(200).json(geojson)
    }
)
module.exports = { getGeoJson }
