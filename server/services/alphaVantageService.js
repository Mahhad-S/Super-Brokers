const axios = require('axios');
require('dotenv').config();

const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;
