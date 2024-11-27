const mongoose = require('mongoose');

// Defined the schema
const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
    },
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    clicks: {
        type: Number,
        default: 0,
    },
    lastAccessed: {
        type: Date,
        default: null,
    },
});

// Exported the model
module.exports = mongoose.model('URL', urlSchema);
