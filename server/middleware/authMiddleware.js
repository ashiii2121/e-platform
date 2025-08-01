const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const checkAccess = (req, res, next) => {
    if (req.user && (req.user.isPaid || (req.user.isTrialActive && new Date() < req.user.trialEnds))) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied. Please subscribe or start a trial.' });
    }
};

module.exports = { protect, checkAccess };