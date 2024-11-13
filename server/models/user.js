const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
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
    default: 50000, // Start with $50,000
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
});

module.exports = mongoose.model('User', UserSchema);