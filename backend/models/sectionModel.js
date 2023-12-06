const mongoose = require('mongoose')

const districtSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    locations: {
        type: [String],
        required: true,
    },
})

const sectionSchema = mongoose.Schema(
    {
        districts: [districtSchema],
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Section', sectionSchema)
