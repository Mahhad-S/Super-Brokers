const axios = require('axios');
require('dotenv').config();

const FINNHUB_API_URL = 'https://finnhub.io/api/v1';
const API_KEY = process.env.FINNHUB_API_KEY;

// Log the API key to verify it is being loaded correctly
console.log('FINNHUB API KEY:', API_KEY);

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
        return response.data; // Ensure this returns the correct structure
    } catch (error) {
        console.error(`Error fetching symbol lookup for query "${query}":`, error.message);
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
        console.log('Attempting to fetch general market news from Finnhub API...');
        const response = await axios.get(`${FINNHUB_API_URL}/news`, {
            params: {
                category: 'general',
                token: API_KEY,
            },
        });

        const allArticles = response.data;
        console.log('Total articles retrieved:', allArticles.length);

        // Get 5 random articles
        const selectedArticles = getRandomArticles(allArticles, 3);
        console.log('Selected 3 random articles:', selectedArticles);

        return selectedArticles;
    } catch (error) {
        // Log more detailed error information
        if (error.response) {
            // The server responded with a status code outside of the 2xx range
            console.error('Error response from API:', error.response.data);
            console.error('Status code:', error.response.status);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received from API:', error.request);
        } else {
            // Something went wrong in setting up the request
            console.error('Error setting up request:', error.message);
        }

        throw new Error('Failed to retrieve market news');
    }
};

// Helper function to select random articles
const getRandomArticles = (articles, numberOfArticles) => {
    const shuffled = articles.sort(() => 0.5 - Math.random()); // Shuffle the array
    return shuffled.slice(0, numberOfArticles); // Get the first `numberOfArticles` elements
};

// Look up news for company dictated by ticker query
const getCompanyNews = async (symbol) => {
    try {
        const fromDate = new Date();
        fromDate.setMonth(fromDate.getMonth() - 3); // 3 months ago
        const toDate = new Date();

        const response = await axios.get(`${FINNHUB_API_URL}/company-news`, {
            params: {
                symbol,
                from: fromDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                to: toDate.toISOString().split('T')[0],     // Format as YYYY-MM-DD
                token: API_KEY,
            },
        });

        console.log('Finnhub Company News Response:', response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error(`Error fetching company news for ${symbol}:`, error.message);
        throw error;
    }
};

// Fetch stock symbols for the US exchange
const getUSStockSymbols = async () => {
    try {
        const response = await axios.get(`${FINNHUB_API_URL}/stock/symbol`, {
            params: {
                exchange: 'US',
                token: API_KEY,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching US stock symbols:', error);
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
  getUSStockSymbols,
};
