const mongoose = require('mongoose');

const videoSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    standard: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;