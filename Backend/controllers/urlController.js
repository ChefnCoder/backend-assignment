const URL = require('../models/Url');
const crypto = require('crypto');

// POST /shorten - Shorten a URL
exports.shortenUrl = async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: 'Original URL is required' });
    }

    try {
        const shortId = crypto.randomBytes(4).toString('hex');

        const newUrl = new URL({ originalUrl, shortId });
        await newUrl.save();

        res.status(201).json({ shortUrl: `${req.protocol}://${req.get('host')}/${shortId}` });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// GET /:shortId 
exports.redirectUrl = async (req, res) => {
    const { shortId } = req.params;

    try {
        const urlDoc = await URL.findOne({ shortId });

        if (!urlDoc) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        urlDoc.clicks += 1;
        urlDoc.lastAccessed = new Date();
        await urlDoc.save();

        res.redirect(urlDoc.originalUrl);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



// GET /stats/:shortId 
exports.getUrlStats = async (req, res) => {
    console.log('Stats route triggered for shortId:', req.params.shortId);

    const { shortId } = req.params;

    try {
        const urlDoc = await URL.findOne({ shortId });

        if (!urlDoc) {
            return res.status(404).json({ error: 'Short URL not found' });
        }

        res.json({
            originalUrl: urlDoc.originalUrl,
            clicks: urlDoc.clicks,
            lastAccessed: urlDoc.lastAccessed,
        });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



