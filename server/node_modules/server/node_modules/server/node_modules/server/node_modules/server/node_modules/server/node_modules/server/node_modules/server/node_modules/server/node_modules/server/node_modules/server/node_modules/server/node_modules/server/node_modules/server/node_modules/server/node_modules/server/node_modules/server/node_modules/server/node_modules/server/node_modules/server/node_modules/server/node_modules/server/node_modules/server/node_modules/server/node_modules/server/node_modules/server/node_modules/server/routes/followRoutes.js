const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Endpoint to follow a stock
router.post('/follow', async (req, res) => {
  const { userId, stockSymbol } = req.body;

  try {
    const user = await User.findById(userId);
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
  const { userId, stockSymbol } = req.body;

  try {
    const user = await User.findById(userId);
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

module.exports = router;
