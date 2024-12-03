const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/user');
const { getStockPrice } = require('../services/finnhubService');

// Endpoint to follow a stock
router.post('/follow', async (req, res) => {
  const { _id, stockSymbol } = req.body; // Use _id instead of userId

  try {
    const user = await User.findById(_id); // Use findById with _id
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the stock is already followed
    if (user.followedStocks.includes(stockSymbol)) {
      return res.status(400).json({ msg: 'Stock already followed' });
    }

    // Add stock to followed stocks
    user.followedStocks.push(stockSymbol);
    await user.save();

    res.json({ msg: 'Stock followed successfully', followedStocks: user.followedStocks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint to unfollow a stock
router.post('/unfollow', async (req, res) => {
  const { _id, stockSymbol } = req.body; // Use _id instead of userId

  try {
    const user = await User.findById(_id); // Use findById with _id
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Check if the stock is actually followed
    if (!user.followedStocks.includes(stockSymbol)) {
      return res.status(400).json({ msg: 'Stock is not followed' });
    }

    // Remove the stock from followedStocks
    user.followedStocks = user.followedStocks.filter(symbol => symbol !== stockSymbol);
    await user.save();

    res.json({ msg: 'Stock unfollowed successfully', followedStocks: user.followedStocks });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Endpoint to get followed stocks with current prices
router.get('/followed-stocks/:id', async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: 'Invalid user ID' });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const followedStocks = user.followedStocks || [];

    if (followedStocks.length === 0) {
      return res.status(200).json([]); // Return empty array if no stocks followed
    }

    const pricesPromises = followedStocks.map(async (symbol) => {
      try {
        const price = await getStockPrice(symbol);
        return { symbol, price: price.c }; // Return price if API succeeds
      } catch (error) {
        console.error(`Error fetching price for ${symbol}:`, error.message);
        return { symbol, price: null };
      }
    });

    const stockPrices = await Promise.all(pricesPromises);

    // Sort alphabetically by symbol
    stockPrices.sort((a, b) => a.symbol.localeCompare(b.symbol));

    res.json(stockPrices);
  } catch (err) {
    console.error('Error in followed-stocks endpoint:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;