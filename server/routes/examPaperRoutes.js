const express = require('express');
const ExamPaper = require('../models/ExamPaper');
const router = express.Router();

// Get all exam papers with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      subjectId,
      class: className,
      year,
      difficulty,
      search,
      page = 1,
      limit = 20,
      sortBy = 'year',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = { isAvailable: true };
    
    if (subjectId) filter.subjectId = subjectId;
    if (className) filter.class = className;
    if (year) filter.year = year;
    if (difficulty) filter.difficulty = difficulty;
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
        { topics: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const papers = await ExamPaper.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ExamPaper.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.json({
      papers,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalPapers: total,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam papers', error: error.message });
  }
});

// Get exam papers by subject
router.get('/subject/:subjectId', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const { year, difficulty, page = 1, limit = 50 } = req.query;

    const filter = { subjectId, isAvailable: true };
    if (year) filter.year = year;
    if (difficulty) filter.difficulty = difficulty;

    const skip = (page - 1) * limit;
    const papers = await ExamPaper.find(filter)
      .sort({ year: -1, month: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await ExamPaper.countDocuments(filter);

    res.json({
      papers,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / limit)
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching subject papers', error: error.message });
  }
});

// Get single exam paper
router.get('/:paperId', async (req, res) => {
  try {
    const { paperId } = req.params;
    const paper = await ExamPaper.findOne({ id: paperId, isAvailable: true });
    
    if (!paper) {
      return res.status(404).json({ message: 'Exam paper not found' });
    }
    
    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching exam paper', error: error.message });
  }
});

// Download exam paper (increment download count)
router.post('/:paperId/download', async (req, res) => {
  try {
    const { paperId } = req.params;
    const paper = await ExamPaper.findOneAndUpdate(
      { id: paperId, isAvailable: true },
      { $inc: { downloadCount: 1 } },
      { new: true }
    );
    
    if (!paper) {
      return res.status(404).json({ message: 'Exam paper not found' });
    }
    
    res.json({
      message: 'Download initiated',
      downloadUrl: paper.downloadUrl,
      paper: {
        id: paper.id,
        title: paper.title,
        fileSize: paper.fileSize,
        downloadCount: paper.downloadCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error processing download', error: error.message });
  }
});

// Get years available for a subject
router.get('/subject/:subjectId/years', async (req, res) => {
  try {
    const { subjectId } = req.params;
    const years = await ExamPaper.distinct('year', { 
      subjectId, 
      isAvailable: true 
    });
    
    // Sort years in descending order
    years.sort((a, b) => parseInt(b) - parseInt(a));
    
    res.json(years);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching years', error: error.message });
  }
});

// Get statistics for dashboard
router.get('/stats/overview', async (req, res) => {
  try {
    const totalPapers = await ExamPaper.countDocuments({ isAvailable: true });
    const totalSubjects = await ExamPaper.distinct('subjectId').then(arr => arr.length);
    const totalDownloads = await ExamPaper.aggregate([
      { $match: { isAvailable: true } },
      { $group: { _id: null, total: { $sum: '$downloadCount' } } }
    ]);
    
    const yearRange = await ExamPaper.aggregate([
      { $match: { isAvailable: true } },
      { 
        $group: { 
          _id: null, 
          minYear: { $min: '$year' }, 
          maxYear: { $max: '$year' } 
        } 
      }
    ]);

    res.json({
      totalPapers,
      totalSubjects,
      totalDownloads: totalDownloads[0]?.total || 0,
      yearRange: yearRange[0] || { minYear: '2000', maxYear: '2025' },
      yearsSpan: yearRange[0] ? 
        parseInt(yearRange[0].maxYear) - parseInt(yearRange[0].minYear) + 1 : 26
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

// Create new exam paper (admin only)
router.post('/', async (req, res) => {
  try {
    const paper = new ExamPaper(req.body);
    await paper.save();
    res.status(201).json(paper);
  } catch (error) {
    res.status(400).json({ message: 'Error creating exam paper', error: error.message });
  }
});

// Update exam paper (admin only)
router.put('/:paperId', async (req, res) => {
  try {
    const { paperId } = req.params;
    const paper = await ExamPaper.findOneAndUpdate(
      { id: paperId },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!paper) {
      return res.status(404).json({ message: 'Exam paper not found' });
    }
    
    res.json(paper);
  } catch (error) {
    res.status(400).json({ message: 'Error updating exam paper', error: error.message });
  }
});

// Delete exam paper (admin only)
router.delete('/:paperId', async (req, res) => {
  try {
    const { paperId } = req.params;
    const paper = await ExamPaper.findOneAndUpdate(
      { id: paperId },
      { isAvailable: false },
      { new: true }
    );
    
    if (!paper) {
      return res.status(404).json({ message: 'Exam paper not found' });
    }
    
    res.json({ message: 'Exam paper deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting exam paper', error: error.message });
  }
});

module.exports = router;
