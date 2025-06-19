require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const path = require('path');
const authRoutes = require('./routes/auth');
const oauthRoutes = require('./routes/oauth');
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use('/auth', require('./routes/oauth'));

// Initialize passport
app.use(passport.initialize());

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../frontend')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Use auth routes
app.use('/', authRoutes);
app.use('/auth', oauthRoutes);

// Serve oauth-success.html for OAuth callbacks
app.get('/oauth-success.html', (req, res) => {
    console.log('Serving oauth-success.html...');
    res.sendFile(path.join(__dirname, '../frontend/oauth-success.html'));
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.get('*', (req, res) => {
    res.status(404).send('Page not found');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});