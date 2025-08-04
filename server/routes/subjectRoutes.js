const express = require('express');
const Subject = require('../models/Subject');
const ExamPaper = require('../models/ExamPaper');
const router = express.Router();

// Get all subjects grouped by class
router.get('/', async (req, res) => {
  try {
    const subjects = await Subject.find({ isActive: true }).sort({ class: 1, name: 1 });
    
    const groupedSubjects = {
      class10: {
        name: "Class 10 (SSLC)",
        subjects: subjects.filter(s => s.class === 'class10')
      },
      plus1: {
        name: "Plus One (Class 11)",
        subjects: subjects.filter(s => s.class === 'plus1')
      },
      plus2: {
        name: "Plus Two (Class 12)",
        subjects: subjects.filter(s => s.class === 'plus2')
      }
    };
    
    res.json(groupedSubjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
});

// Get subjects by class
router.get('/class/:className', async (req, res) => {
  try {
    const { className } = req.params;
    const subjects = await Subject.find({ 
      class: className, 
      isActive: true 
    }).sort({ name: 1 });
    
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subjects', error: error.message });
  }
});

// Get single subject by ID
router.get('/:subjectId', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.findOne({ id: subjectId, isActive: true });
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject', error: error.message });
  }
});

// Search subjects
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const subjects = await Subject.find({
      isActive: true,
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { code: { $regex: query, $options: 'i' } }
      ]
    }).sort({ name: 1 });
    
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: 'Error searching subjects', error: error.message });
  }
});

// Create new subject (admin only)
router.post('/', async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    res.status(400).json({ message: 'Error creating subject', error: error.message });
  }
});

// Update subject (admin only)
router.put('/:subjectId', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.findOneAndUpdate(
      { id: subjectId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    
    res.json(subject);
  } catch (error) {
    res.status(400).json({ message: 'Error updating subject', error: error.message });
  }
});

// Delete subject (admin only)
router.delete('/:subjectId', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const subject = await Subject.findOneAndUpdate(
      { id: subjectId },
      { isActive: false },
      { new: true }
    );
    
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }
    
    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subject', error: error.message });
  }
});

module.exports = router;
