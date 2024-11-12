const express = require('express');
const router = express.Router();
const { getCompanyProfile, getStockPrice, getBasicFinancials, getStockSymbols, getSymbolLookup } = require('../services/finnhubService');

// Endpoint to get company profile by stock symbol
router.get('/company-profile/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const profile = await getCompanyProfile(symbol);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve company profile' });
  }
});

// Endpoint to get stock price by stock symbol
router.get('/stock-price/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
    const price = await getStockPrice(symbol);
    res.json(price);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve stock price' });
  }
});

// Endpoint to get basic financials for a company
router.get('/basic-financials/:symbol', async (req, res) => {
    const { symbol } = req.params;
    try {
        const financials = await getBasicFinancials(symbol);
        res.json(financials);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve basic financials' });
    }
});

// Endpoint to lookup symbols based on query
router.get('/lookup', async (req, res) => {
    const { query } = req.query;
    if (!query) {
        return res.status(400).json({ error: 'Query parameter is required' });
    }
    try {
        const results = await getSymbolLookup(query);
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to perform symbol lookup' });
    }
});

// Endpoint to get stock symbols for the US exchange
router.get('/symbols', async (req, res) => {
    try {
        const symbols = await getStockSymbols();
        res.json(symbols);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve stock symbols' });
    }
});

module.exports = router;