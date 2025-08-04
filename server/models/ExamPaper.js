const mongoose = require('mongoose');

const examPaperSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  subjectId: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  month: {
    type: String,
    default: 'March'
  },
  type: {
    type: String,
    default: 'Board Exam'
  },
  pdfUrl: {
    type: String,
    required: true
  },
  downloadUrl: {
    type: String,
    required: true
  },
  fileSize: {
    type: String,
    default: '2.5 MB'
  },
  pages: {
    type: Number,
    default: 12
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  topics: [{
    type: String
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  downloadCount: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  source: {
    type: String,
    default: 'Kerala DHSE Portal'
  }
}, {
  timestamps: true
});

// Index for efficient searching
examPaperSchema.index({ subjectId: 1, year: -1 });
examPaperSchema.index({ class: 1, year: -1 });
examPaperSchema.index({ subject: 1, year: -1 });

module.exports = mongoose.model('ExamPaper', examPaperSchema);
