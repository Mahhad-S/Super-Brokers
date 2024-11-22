import React, { useState, useEffect } from 'react'; // Added `useEffect`
import axios from 'axios';
import './style/Home.css';
import { Link } from 'react-router-dom';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [stockData, setStockData] = useState(null);
    const [newsArticles, setNewsArticles] = useState([]);
    const [searchError, setSearchError] = useState(null); // Separate error for search
    const [newsError, setNewsError] = useState(null); // Separate error for news

    // Fetch stock suggestions on "Enter" key press
    const handleKeyPress = async (e) => {
        if (e.key === 'Enter') {
            if (!searchTerm) return;
            try {
                const response = await axios.get(`http://localhost:3001/api/stocks/symbol-lookup/${searchTerm}`);
                setSuggestions(response.data.result || []);
                setSearchError(null);
            } catch (err) {
                setSuggestions([]);
                setSearchError('Failed to fetch symbol suggestions. Please try again.');
            }
        }
    };

    // Fetch stock data when a symbol is selected
    const handleSearch = async (symbol) => {
        if (!symbol) return;
        try {
            const response = await axios.get(`http://localhost:3001/api/stocks/stock-info/${symbol}`);
            setStockData(response.data);
            setSearchError(null);
            setSuggestions([]); // Clear suggestions after selection
            setSearchTerm(''); // Clear search input after selection
        } catch (err) {
            setSearchError('Failed to fetch stock information. Please try again.');
            setStockData(null);
        }
    };

    // Fetch general market news on component mount
    useEffect(() => {
        const fetchMarketNews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/news/market-news');
                setNewsArticles(response.data.slice(0, 3)); // Ensure only 3 articles are used
                setNewsError(null);
            } catch (err) {
                console.error('Error fetching market news:', err.message);
                setNewsError('Failed to fetch market news. Please try again later.');
            }
        };

        fetchMarketNews();
    }, []);

    return (
        <div className="home-main-wrapper">
            <div className="home-hot-bar">
                <div className="home-row">
                    <div className="home-logo-img">
                        <img src="/images/Sb-logo.png" alt="Logo" />
                    </div>
                    <div className="home-nav-col">
                        <Link to="/Dashboard" className="home-tab-link">DASHBOARD</Link>
                    </div>
                    <div className="home-nav-col">
                        <Link to="/About" className="home-tab-link">ABOUT</Link>
                    </div>
                    <div className="home-nav-col">
                        <Link to="/Help" className="home-tab-link">HELP</Link>
                    </div>
                </div>
            </div>

            <div className="home-main-content">
                <div className="home-content-left">
                    <div className="home-search-bar">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search for a stock..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={handleKeyPress} // Trigger on "Enter" key press
                        />
                    </div>
                    {suggestions.length > 0 && (
                        <ul className="dropdown">
                            {suggestions.map((item, index) => (
                                <li
                                    key={index}
                                    onClick={() => handleSearch(item.symbol)}
                                >
                                    <strong>{item.displaySymbol}</strong> - {item.description}
                                </li>
                            ))}
                        </ul>
                    )}
                    {stockData && (
                        <>
                            <div className="home-stock-name">{stockData.profile.ticker}</div>
                            <div className="home-row-content">
                                <h3>{stockData.profile.name}</h3>
                                <p>Market Capitalization: ${stockData.profile.marketCapitalization}</p>
                                <p>Industry: {stockData.profile.finnhubIndustry}</p>
                                <p>10-Day Average Volume: {stockData.financials['10DayAverageTradingVolume']}</p>
                                <p>52-Week High: ${stockData.financials['52WeekHigh']}</p>
                                <p>52-Week Low: ${stockData.financials['52WeekLow']}</p>
                                <p>52-Week Low Date: {stockData.financials['52WeekLowDate']}</p>
                                <p>52-Week Return: {stockData.financials['52WeekPriceReturnDaily']}%</p>
                                <p>Beta: {stockData.financials['beta']}</p>
                            </div>
                        </>
                    )}
                    {searchError && <p className="error">{searchError}</p>}
                </div>
                <div className="home-content-right">
                    {/* Bubble 1 */}
                    <div className="home-bubble">
                        {newsArticles[0] ? (
                            <div>
                                <h3>
                                    <a href={newsArticles[0].url} target="_blank" rel="noopener noreferrer">
                                        {newsArticles[0].headline}
                                    </a>
                                </h3>
                                <p>{newsArticles[0].summary}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    {/* Bubble 2 */}
                    <div className="home-bubble">
                        {newsArticles[1] ? (
                            <div>
                                <h3>
                                    <a href={newsArticles[1].url} target="_blank" rel="noopener noreferrer">
                                        {newsArticles[1].headline}
                                    </a>
                                </h3>
                                <p>{newsArticles[1].summary}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                    {/* Bubble 3 */}
                    <div className="home-bubble">
                        {newsArticles[2] ? (
                            <div>
                                <h3>
                                    <a href={newsArticles[2].url} target="_blank" rel="noopener noreferrer">
                                        {newsArticles[2].headline}
                                    </a>
                                </h3>
                                <p>{newsArticles[2].summary}</p>
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
            {newsError && <p className="error">{newsError}</p>}
        </div>
    );
}

export default Home;