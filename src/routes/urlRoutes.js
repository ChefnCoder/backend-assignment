const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl, getUrlStats } = require('../controllers/urlController');

router.post('/api/shorten', shortenUrl);

router.get('/:shortId', redirectUrl);

router.get('/api/stats/:shortId', getUrlStats);

module.exports = router;
