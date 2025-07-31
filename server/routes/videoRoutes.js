const express = require('express');
const Video = require('../models/Video');
const { protect, checkAccess } = require('../middleware/authMiddleware');

const router = express.Router();

// @desc    Get all videos
// @route   GET /api/videos
// @access  Private (requires subscription or trial)
router.get('/', async (req, res) => {
    try {
        const videos = await Video.find({});
        res.json(videos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Add a new video (Admin only - for future implementation)
// @route   POST /api/videos
// @access  Private (Admin)
router.post('/', protect, async (req, res) => {
    // This route would typically be restricted to admin users.
    // For now, anyone authenticated can add a video. Implement admin check later.
    const { title, url, subject, standard } = req.body;

    try {
        const video = new Video({
            title,
            url,
            subject,
            standard,
        });

        const createdVideo = await video.save();
        res.status(201).json(createdVideo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;