const axios = require('axios');
require('dotenv').config();

const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

const getAlphaVantageCandlestickData = async (symbol) => {
    try {
        const response = await axios.get(ALPHA_VANTAGE_API_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '15min', // You can use intervals like 1min, 5min, 15min, 30min, 60min
                apikey: API_KEY,
            },
        });

        // Log the response to debug
        console.log('Alpha Vantage Intraday Response:', response.data);

        const data = response.data['Time Series (15min)'];
        if (!data) {
            throw new Error(
                response.data['Note'] || response.data['Error Message'] || 'Failed to retrieve intraday data.'
            );
        }

        // Transform data into a format usable by the candlestick chart
        const transformedData = Object.entries(data).map(([timestamp, values]) => ({
            x: timestamp, // Time of the data point
            o: parseFloat(values['1. open']), // Open price
            h: parseFloat(values['2. high']), // High price
            l: parseFloat(values['3. low']), // Low price
            c: parseFloat(values['4. close']), // Close price
        }));

        // Return the most recent 30 entries
        return transformedData.slice(0, 30).reverse(); // Reverse to display in chronological order
    } catch (error) {
        console.error('Error fetching Alpha Vantage intraday data:', error.message);
        throw error;
    }
};

module.exports = { getAlphaVantageCandlestickData };