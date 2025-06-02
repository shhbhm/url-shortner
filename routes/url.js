const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Home page
router.get('/', (req, res) => {
    res.render('index');
});

// Generate short URL
router.post('/shorten', urlController.generateShortUrl);

// Redirect to original URL
router.get('/:shortUrl', urlController.redirectToOriginal);

// Get all URLs
router.get('/urls/all', urlController.getAllUrls);

module.exports = router;
