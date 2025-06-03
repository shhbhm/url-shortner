const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.render('signup', { error: 'Email already registered' });
        }

        // Create new user
        const user = new User({ email, password });
        await user.save();

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.redirect('/');
    } catch (error) {
        console.error('Signup Error:', error);
        res.render('signup', { 
            error: error.message || 'Something went wrong during signup',
            email: req.body.email // Preserve email on error
        });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.render('login', { 
                error: 'Invalid credentials',
                email: req.body.email // Preserve email on error
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.render('login', { 
                error: 'Invalid credentials',
                email: req.body.email // Preserve email on error
            });
        }

        // Generate token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        // Set cookie
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.redirect('/');
    } catch (error) {
        console.error('Login Error:', error);
        res.render('login', { 
            error: error.message || 'Something went wrong during login',
            email: req.body.email // Preserve email on error
        });
    }
};

// Logout
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/auth/login');
}; 