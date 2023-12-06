const mongoose = require('mongoose')

const settingsSchema = mongoose.Schema(
    {
        darkMode: {
        type: Boolean,
        default: false,
        },
        // add premium membership boolean
        premium: {
        type: Boolean,
        default: false,
        },
    },
    {
        timestamps: true,
    }
    );

module.exports = mongoose.model('Settings', settingsSchema);
