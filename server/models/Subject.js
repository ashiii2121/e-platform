const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  class: {
    type: String,
    required: true,
    enum: ['class10', 'plus1', 'plus2']
  },
  className: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Subject', subjectSchema);
