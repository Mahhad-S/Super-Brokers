const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    default: "Anonymous", // Default value
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  virtualBalance: {
    type: Number,
    default: 15000, // Start with $15,000
  },
  portfolio: [
    {
      stockSymbol: String,
      quantity: Number,
      averagePrice: Number,
    },
  ],
  tradeHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'trade',
    },
  ],
  followedStocks: [
    {
      type: String, // Stock symbol
    },
  ],
});

module.exports = mongoose.model('User', UserSchema);