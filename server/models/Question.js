const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true, // 'previous' or 'model'
    },
    subject: {
        type: String,
        required: true,
    },
    standard: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
    },
}, {
    timestamps: true,
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;