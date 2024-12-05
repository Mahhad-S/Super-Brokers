const axios = require('axios');
require('dotenv').config();

const ALPHA_VANTAGE_API_URL = 'https://www.alphavantage.co/query';
const API_KEY = process.env.ALPHA_VANTAGE_API_KEY;

/*
const getAlphaVantageCandlestickData = async (symbol) => {
    try {
        const response = await axios.get(ALPHA_VANTAGE_API_URL, {
            params: {
                function: 'TIME_SERIES_INTRADAY',
                symbol,
                interval: '15min',
                apikey: API_KEY,
            },
        });

        // Log full response to debug
        console.log('Alpha Vantage API Response:', response.data);

        const data = response.data['Time Series (15min)'];
        if (!data) {
            throw new Error(
                response.data['Note'] || response.data['Error Message'] || 'Failed to retrieve intraday data.'
            );
        }

        const transformedData = Object.entries(data).map(([timestamp, values]) => ({
            x: timestamp,
            o: parseFloat(values['1. open']),
            h: parseFloat(values['2. high']),
            l: parseFloat(values['3. low']),
            c: parseFloat(values['4. close']),
        }));

        return transformedData.slice(0, 30).reverse();
    } catch (error) {
        console.error('Error fetching Alpha Vantage intraday data:', error.message);
        throw error;
    }
};
*/

module.exports = { /*getAlphaVantageCandlestickData*/ }; //Return empty module