const express = require('express');
const Question = require('../models/Question');
const { protect, checkAccess } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get previous year questions
// @route   GET /api/questions/previous
// @access  Private (requires subscription or trial)
router.get('/previous', async (req, res) => {
    try {
        const questions = await Question.find({ type: 'previous' });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get model questions
// @route   GET /api/questions/model
// @access  Private (requires subscription or trial)
router.get('/model', protect, checkAccess, async (req, res) => {
    try {
        const questions = await Question.find({ type: 'model' });
        res.json(questions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a new question (Admin only - for future implementation)
// @route   POST /api/questions
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
    // This route would typically be restricted to admin users.
    // For now, anyone authenticated can add a question. Implement admin check later.
    const { title, type, subject, standard, pdfUrl } = req.body;

    try {
        const question = new Question({
            title,
            type,
            subject,
            standard,
            pdfUrl,
        });

        const createdQuestion = await question.save();
        res.status(201).json(createdQuestion);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;