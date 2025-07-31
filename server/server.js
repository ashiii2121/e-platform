const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path'); // Import path module
const authRoutes = require('./routes/authRoutes');
const videoRoutes = require('./routes/videoRoutes');
const questionRoutes = require('./routes/questionRoutes');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/questions', questionRoutes);

// Dummy Payment Route
app.post('/api/payment', (req, res) => {
    // In a real application, you would integrate with a payment gateway here.
    // For now, we'll just simulate a successful payment.
    const { userId, amount } = req.body;
    console.log(`Simulating payment for user ${userId} with amount ${amount}`);
    // Here you would update the user's isPaid status in the database
    res.status(200).json({ message: 'Payment successful (dummy)', success: true });
});

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../client/dist', 'index.html'));
    });
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));