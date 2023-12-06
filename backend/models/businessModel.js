const mongoose = require('mongoose');

const businessSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    industry: {
      type: String,
      required: [true, 'Please add an industry'],
    },
    revenue: {
      type: Number,
      required: [true, 'Please add a revenue'],
    },
    inventory: {
      type: Array,
      required: [false, 'Please add inventory'],
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Business', businessSchema);
