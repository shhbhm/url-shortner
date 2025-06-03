const Url = require('../models/Url');
const shortid = require('shortid');

// Generate short URL
exports.generateShortUrl = async (req, res) => {
    try {
        const { originalUrl } = req.body;
        const shortUrl = shortid.generate();
        
        const url = new Url({
            originalUrl,
            shortUrl,
            user: req.user._id
        });
        
        await url.save();
        
        // Get all URLs for the user
        const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
        
        res.render('index', { 
            shortUrl,
            urls
        });
    } catch (error) {
        console.error('Error generating short URL:', error);
        res.status(500).render('index', { 
            error: 'Error generating short URL',
            urls: await Url.find({ user: req.user._id }).sort({ createdAt: -1 })
        });
    }
};

// Redirect to original URL
exports.redirectToOriginal = async (req, res) => {
    try {
        const url = await Url.findOne({ shortUrl: req.params.shortUrl });
        if (!url) {
            return res.status(404).render('error', { message: 'URL not found' });
        }
        
        url.clicks++;
        await url.save();
        
        res.redirect(url.originalUrl);
    } catch (error) {
        console.error('Error redirecting:', error);
        res.status(500).render('error', { message: 'Server error' });
    }
};

// Get all URLs
exports.getAllUrls = async (req, res) => {
    try {
        const urls = await Url.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.render('index', { urls });
    } catch (error) {
        console.error('Error getting URLs:', error);
        res.status(500).render('index', { 
            error: 'Error getting URLs',
            urls: []
        });
    }
}; 