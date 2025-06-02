const Url = require('../models/url');
const shortid = require('shortid');

// Generate short URL
exports.generateShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        
        // Check if URL already exists
        let url = await Url.findOne({ originalUrl });
        if (url) {
            return res.render('index', { shortUrl: url.shortUrl });
        }

        // Generate short URL
        const shortUrl = shortid.generate();
        url = new Url({
            originalUrl,
            shortUrl
        });

        await url.save();
        res.render('index', { shortUrl });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
};

// Redirect to original URL
exports.redirectToOriginal = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (!url) {
            return res.status(404).json('URL not found');
        }

        url.clicks++;
        await url.save();
        
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
};

// Get all URLs
exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.render('urls', { urls });
    } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
    }
}; 