const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
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