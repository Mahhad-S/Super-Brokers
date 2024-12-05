const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { getCompanyProfile, getStockPrice, getBasicFinancials, getStockSymbols, getSymbolLookup, } = require('../services/finnhubService');
const { getAlphaVantageCandlestickData } = require('../services/alphaVantageService');
const User = require('../models/user'); 

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

router.get('/user/portfolio/:userId', async (req, res) => {
  const { userId } = req.params;
  console.log(`Incoming request for user portfolio with ID: ${userId}`);

  try {
      // Validate if userId is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(userId)) {
          console.error(`Invalid user ID format: ${userId}`);
          return res.status(400).json({ msg: 'Invalid user ID format' });
      }

      // Use new keyword to instantiate ObjectId properly
      const user = await User.findById(new mongoose.Types.ObjectId(userId));
      if (!user) {
          console.error(`User not found for ID: ${userId}`);
          return res.status(404).json({ msg: 'User not found' });
      }

      console.log(`User portfolio fetched successfully:`, user.portfolio);
      res.status(200).json({ portfolio: user.portfolio });
  } catch (error) {
      console.error('Error fetching user portfolio:', error); // Log the entire error object
      res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;