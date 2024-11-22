const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  stockSymbol: {
    type: String,
    required: true,
  },
  transactionType: {
    type: String,
    enum: ['buy', 'sell'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  transactionValue: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Trade', TradeSchema);
