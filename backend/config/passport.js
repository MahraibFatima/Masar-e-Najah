const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if user already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
            // Create new user if doesn't exist
            user = await User.create({
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                email: profile.emails[0].value,
                password: Math.random().toString(36).slice(-8), // Random password for OAuth users
                googleId: profile.id
            });
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

// GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback",
    scope: ['user:email'], // Ensure this is present
}, async (accessToken, refreshToken, profile, done) => {
    try {
        console.log('GitHub Profile:', profile);

        // Safe fallback for email
        const email = (profile.emails && profile.emails[0] && profile.emails[0].value)
            || `${profile.username || 'githubuser'}@github.com`;

        const fullName = profile.displayName || profile.username || 'GitHub User';
        const [firstName, ...lastArr] = fullName.split(' ');
        const lastName = lastArr.join(' ');

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                firstName: firstName || 'GitHub',
                lastName: lastName || '',
                email,
                password: Math.random().toString(36).slice(-8), // random temp password
                githubId: profile.id
            });
        }

        return done(null, user);
    } catch (error) {
        console.error('GitHub Strategy Error:', error);
        return done(error, null);
    }
}));

module.exports = passport; 