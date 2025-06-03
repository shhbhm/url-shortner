const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Login page
router.get('/login', (req, res) => {
    res.render('login');
});

// Signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Login
router.post('/login', authController.login);

// Signup
router.post('/signup', authController.signup);

// Logout
router.get('/logout', authController.logout);

module.exports = router; 