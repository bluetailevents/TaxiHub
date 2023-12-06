const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
{
    content: {
    type: String,
    required: true,
    },
    // You can add more fields as needed
},
{
    timestamps: true,
}
);

module.exports = mongoose.model('Notes', noteSchema);
