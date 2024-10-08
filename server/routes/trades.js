const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Trade = require('../models/trade');

// Trade route
router.post('/trade', async (req, res) => {
  const { userId, stockSymbol, transactionType, quantity, transactionValue } = req.body;

  try {
    // Create new trade doc
    const newTrade = new Trade({
      userId,
      stockSymbol,
      transactionType,
      quantity,
      transactionValue,
    });

    // Save trade
    await newTrade.save();

    // Update user portfolio and trade hist
    const user = await User.findById(userId);
    
    // Update portfolio (buy/sell)
    const stockIndex = user.portfolio.findIndex((stock) => stock.stockSymbol === stockSymbol);

    if (transactionType === 'buy') {
      if (stockIndex >= 0) {
        // If stock exists in portfolio update quantity and avg. price
        const existingStock = user.portfolio[stockIndex];
        const newTotalQuantity = existingStock.quantity + quantity;
        const newAveragePrice = ((existingStock.quantity * existingStock.averagePrice) + transactionValue) / newTotalQuantity;

        user.portfolio[stockIndex].quantity = newTotalQuantity;
        user.portfolio[stockIndex].averagePrice = newAveragePrice;
      } else {
        // If stock is new add to portfolio
        user.portfolio.push({ stockSymbol, quantity, averagePrice: transactionValue / quantity });
      }
    } else if (transactionType === 'sell') {
      if (stockIndex >= 0) {
        const existingStock = user.portfolio[stockIndex];

        // Only sells if user has enough quantity to sell
        if (existingStock.quantity >= quantity) {
          existingStock.quantity -= quantity;
          
          // When quantity == 0 stock is removed from portfolio
          if (existingStock.quantity === 0) {
            user.portfolio.splice(stockIndex, 1);
          }
        } else {
          return res.status(400).json({ msg: 'Not enough shares to sell' });
        }
      } else {
        return res.status(400).json({ msg: 'Stock not found in portfolio' });
      }
    }

    // Add to user trade hist
    user.tradeHistory.push(newTrade._id);

    // Save user
    await user.save();

    res.json({ msg: 'Trade successful', trade: newTrade });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
