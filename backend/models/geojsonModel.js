const mongoose = require('mongoose');
const { Schema } = mongoose;

const GeoJsonSchema = new Schema({
type: {
    type: String,
    enum: ['FeatureCollection'],
    required: true
},
features: [{
    type: {
    type: String,
    enum: ['Feature'],
    required: true
    },
    properties: {
    Section: String,
    Subsection: String,
    Category: String,
    Street: String,
    Postcode: String
    },
    geometry: {
    type: {
        type: String,
        enum: ['Point'],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true
    }
    }
}]
});

module.exports = mongoose.model('GeoJson', GeoJsonSchema, 'geojson');
