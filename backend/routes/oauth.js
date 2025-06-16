const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Google OAuth routes
router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        // Generate JWT token
        const token = jwt.sign(
            { userId: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Redirect to frontend with token and user data
        res.redirect(`${process.env.FRONTEND_URL}/oauth-success.html?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email
        }))}`);
    }
);

// GitHub OAuth routes
router.get('/github',
    passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
    passport.authenticate('github', { session: false }),
    (req, res) => {
        // Generate JWT token
        const token = jwt.sign(
            { userId: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Redirect to frontend with token and user data
        res.redirect(`${process.env.FRONTEND_URL}/oauth-success.html?token=${token}&user=${encodeURIComponent(JSON.stringify({
            id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            email: req.user.email
        }))}`);
    }
);

module.exports = router; 