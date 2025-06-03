const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const auth = require('../middlewares/auth');
const Url = require('../models/Url');

// Home page - protected
router.get('/', auth, async (req, res) => {
    try {
        const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.render('index', { user: req.user, urls });
    } catch (error) {
        console.error('Error getting URLs:', error);
        res.render('index', { user: req.user, urls: [] });
    }
});

// Generate short URL - protected
router.post('/shorten', auth, urlController.generateShortUrl);

// Redirect to original URL - public
router.get('/:shortUrl', urlController.redirectToOriginal);

// Get all URLs - protected
router.get('/urls/all', auth, urlController.getAllUrls);

module.exports = router;
