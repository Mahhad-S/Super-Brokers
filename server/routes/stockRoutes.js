const express = require('express');
const router = express.Router();
const { getCompanyProfile, getStockPrice, getBasicFinancials, getStockSymbols, getSymbolLookup, } = require('../services/finnhubService');
const { getAlphaVantageCandlestickData } = require('../services/alphaVantageService');

// Endpoint to get company profile & basic financials by stock symbol
router.get('/stock-info/:symbol', async (req, res) => {
  const { symbol } = req.params;
  try {
      const profile = await getCompanyProfile(symbol);
      const financials = await getBasicFinancials(symbol);
      res.json({ profile, financials });
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve stock information' });
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

// Symbol Lookup with US Stock Filter
router.get('/symbol-lookup/:query', async (req, res) => {
  const { query } = req.params;
  try {
      // Fetch results from Finnhub
      const lookupResults = await getSymbolLookup(query);

      // Filter results to include matches in description or displaySymbol
      const filteredResults = lookupResults.result.filter(item =>
          item.description.toLowerCase().includes(query.toLowerCase()) || // Match company name
          item.displaySymbol.toLowerCase().includes(query.toLowerCase())  // Match ticker symbol
      );

      // Prioritize US stocks (NASDAQ and NYSE)
      const prioritizedResults = filteredResults.sort((a, b) => {
          const isUSStockA = a.mic === 'XNAS' || a.mic === 'XNYS';
          const isUSStockB = b.mic === 'XNAS' || b.mic === 'XNYS';
          if (isUSStockA && !isUSStockB) return -1; // US stocks first
          if (!isUSStockA && isUSStockB) return 1;
          return 0; // Preserve relative order otherwise
      });

      res.json({ result: prioritizedResults });
  } catch (error) {
      console.error('Error in symbol lookup:', error);
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