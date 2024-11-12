const axios = require('axios');
require('dotenv').config();

const FINNHUB_API_URL = 'https://finnhub.io/api/v1';
const API_KEY = process.env.FINNHUB_API_KEY;

// Fetch Company Profile based on Stock Symbol
const getCompanyProfile = async (symbol) => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/stock/profile2`, {
            params: {
                symbol: symbol,
                token: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching company profile for ${symbol}: `, error);
        throw error;
    }
};

// Fetch Real-time Stock Price
const getStockPrice = async (symbol) => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/quote`, {
            params: {
                symbol: symbol,
                token: API_KEY,
            },
        });
    return response.data;
    } catch (error) {
        console.error(`Error fetching stock price for ${symbol}: `, error);
        throw error;
    }
};

// Fetch stock symbols for US exchanges
const getStockSymbols = async () => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/stock/symbol`, {
            params: {
                exchange: 'US',
                token: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching stock symbols:', error);
        throw error;
    }
};

// Fetch Symbol Lookup based on query
const getSymbolLookup = async (query) => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/search`, {
            params: {
                q: query,
                token: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching symbol lookup for query "${query}": `, error);
        throw error;
    }
};

// Fetch Basic Financials (Metrics)
const getBasicFinancials = async (symbol) => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/stock/metric`, {
            params: {
                symbol: symbol,
                metric: 'all',
                token: API_KEY,
            },
        });

        // Filter out data that we don't need
        const { metric } = response.data;
        const filteredMetrics = {
            '10DayAverageTradingVolume': metric['10DayAverageTradingVolume'],
            '52WeekHigh': metric['52WeekHigh'],
            '52WeekLow': metric['52WeekLow'],
            '52WeekLowDate': metric['52WeekLowDate'],
            '52WeekPriceReturnDaily': metric['52WeekPriceReturnDaily'],
            'beta': metric['beta'],
        };
        return filteredMetrics;
    } catch (error) {
        console.error(`Error fetching basic financials for ${symbol}: `, error);
        throw error;
    }
};

// Fetch general news articles related to market
const getGenMarketNews = async () => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/news`, {
            params: {
                category: 'general',
                token: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching general market news:', error);
        throw error;
    }
};

const getCompanyNews = async (symbol) => {
    try {
        // Get todays date and the date 3 months ago
        const toDate = new Date();
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 3);
  
        // Format dates as YYYY-MM-DD
        const formattedFromDate = fromDate.toISOString().split('T')[0];
        const formattedToDate = toDate.toISOString().split('T')[0];
  
        // Make API call
        const response = await axios.get(`${FINNHUB_API_URL}/company-news`, {
            params: {
            symbol: symbol,
            from: formattedFromDate,
            to: formattedToDate,
            token: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error(`Error fetching company news for ${symbol}: `, error);
        throw error;
    }
};

// Export the functions
module.exports = {
  getCompanyProfile,
  getStockPrice,
  getStockSymbols,
  getSymbolLookup,
  getBasicFinancials,
  getGenMarketNews,
  getCompanyNews,
};
