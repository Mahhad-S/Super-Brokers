const express = require('express');
const router = express.Router();
const { getGeneralMarketNews } = require('../services/finnhubService');

// Endpoint to get general market news
router.get('/market-news', async (req, res) => {
  try {
    const news = await getGeneralMarketNews();
    res.json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve market news' });
  }
});

// Endpoint to get company news for the past 3 months by stock symbol
router.get('/company-news/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const news = await getCompanyNews(symbol);
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve company news' });
    }
});

module.exports = router;