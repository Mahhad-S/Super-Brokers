import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import CandlestickChart from './CandlestickChart';
import { AuthContext } from './context/AuthContext';
import './style/Home.css';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [stockData, setStockData] = useState(null);
    const [stockPrice, setStockPrice] = useState(null); // State for stock price
    const [newsArticles, setNewsArticles] = useState([]);
    const [searchError, setSearchError] = useState(null);
    const [newsError, setNewsError] = useState(null);
    const [candlestickData, setCandlestickData] = useState(null); // State for candlestick data
    const { isAuthenticated } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const searchRef = useRef(null); // Ref to detect clicks outside

    // Fetch general market news on component mount
    useEffect(() => {
        const fetchMarketNews = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/news/market-news');
                setNewsArticles(response.data.slice(0, 3)); // Fetch 3 articles for general market news
                setNewsError(null);
            } catch (err) {
                console.error('Error fetching market news:', err.message);
                setNewsError('Failed to fetch market news. Please try again later.');
            }
        };

        fetchMarketNews();
    }, []);

    useEffect(() => {
        const fetchCandlestickData = async () => {
            if (!stockData || !stockData.profile || !stockData.profile.ticker) return;
    
            try {
                const response = await fetch(`/api/alpha-vantage/candlestick-data?symbol=${stockData.profile.ticker}`);
                if (!response.ok) throw new Error("Failed to fetch candlestick data");
                const data = await response.json();
                setCandlestickData(data);
            } catch (error) {
                console.error("Error fetching candlestick data:", error);
                setCandlestickData(null); // Reset data to avoid rendering issues
            }
        };
    
        fetchCandlestickData();
    }, [stockData]);

        // Close dropdown if clicked outside
        useEffect(() => {
            const handleClickOutside = (e) => {
                if (!document.querySelector('.home-search-bar-container')?.contains(e.target)) {
                    setSuggestions([]);
                }
            };
        
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }, []);

    // Fetch stock suggestions when the user presses "Enter"
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

    // Fetch stock details, price, and company-specific news when a symbol is selected
    const handleSearch = async (symbol) => {
        if (!symbol) return;
        try {
            // Fetch stock details
            const stockResponse = await axios.get(`http://localhost:3001/api/stocks/stock-info/${symbol}`);
            setStockData(stockResponse.data);
    
            // Fetch stock price
            const priceResponse = await axios.get(`http://localhost:3001/api/stocks/stock-price/${symbol}`);
            setStockPrice(priceResponse.data);
    
            // Fetch candlestick data
            const candlestickResponse = await axios.get(`http://localhost:3001/api/stocks/candlestick/${symbol}`);
            setCandlestickData(candlestickResponse.data); // Update candlestick data
    
            // Fetch related company news
            const newsResponse = await axios.get(`http://localhost:3001/api/news/company-news/${symbol}`);
            const randomNews = newsResponse.data.sort(() => 0.5 - Math.random()).slice(0, 3);
            setNewsArticles(randomNews);
    
            setSearchError(null);
            setSuggestions([]);
            setSearchTerm('');
        } catch (err) {
            setSearchError('Failed to fetch stock information or candlestick data. Please try again.');
            setStockData(null);
            setStockPrice(null);
            setCandlestickData(null);
            setNewsArticles([]);
        }
    };

    // Function to start live stock price updates
    const startLiveUpdates = (symbol) => {
        // Clear any existing intervals to avoid duplicate calls
        stopLiveUpdates();

        const interval = setInterval(async () => {
            try {
                const priceResponse = await axios.get(`http://localhost:3001/api/stocks/stock-price/${symbol}`);
                setStockPrice(priceResponse.data); // Update stock price in state
            } catch (err) {
                console.error('Error fetching live stock price:', err.message);
            }
        }, 5000); // Fetch stock price every 5 seconds

        // Store interval ID in state for cleanup
        setLiveUpdateInterval(interval);
    };

    // Cleanup function to stop live updates
    const stopLiveUpdates = () => {
        if (liveUpdateInterval) {
            clearInterval(liveUpdateInterval);
            setLiveUpdateInterval(null);
        }
    };

    // Store the interval ID to clear it when component unmounts or symbol changes
    const [liveUpdateInterval, setLiveUpdateInterval] = useState(null);

    // Cleanup interval on component unmount
    useEffect(() => {
        return () => stopLiveUpdates(); // Clear interval when component unmounts
    }, []);

    // Dropdown
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div className="home-main-wrapper">
            <div className="home-hot-bar">
                <div className="home-logo-img">
                    <img src="/images/Sb-logo.png" alt="Logo" />
                </div>
                {/* Navigation Links */}
                <div className="home-nav-links">
                    {!isAuthenticated ? (
                        <NavLink to="/" className={({ isActive }) => isActive ? "home-tab-link active" : "home-tab-link"}>
                            Home
                        </NavLink>
                    ) : (
                        <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "home-tab-link active" : "home-tab-link"}>
                            Dashboard
                        </NavLink>
                    )}
                    <NavLink to="/About" className={({ isActive }) => isActive ? "home-tab-link active" : "home-tab-link"}>
                        About
                    </NavLink>
                    <NavLink to="/Help" className={({ isActive }) => isActive ? "home-tab-link active" : "home-tab-link"}>
                        Help
                    </NavLink>
                </div>
                <button className="home-user" onClick={toggleDropdown}>
                    <img src="/images/user-icon.png" className="home-user-icon" alt="User Icon" />
                </button>
                {showDropdown && (
                    <div className="home-dropdown-menu">
                        <NavLink to="/" className="home-dropdown-item">Home</NavLink>
                        {!isAuthenticated && (
                            <>
                                <NavLink to="/login" className="home-dropdown-item">Login</NavLink>
                                <NavLink to="/register" className="home-dropdown-item">Sign Up</NavLink>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="home-body-content">
                
                <section className="dashboard-main-left">
                    <section className="dashboard-sub-top" ref={searchRef}>
                        <div className="home-search-bar-container">
                            <input
                                type="text"
                                className="home-search-bar"
                                placeholder="Search for a stock..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyPress} // Trigger on "Enter" key press
                            />
                            {suggestions.length > 0 && (
                                <ul className="dropdown">
                                    {suggestions.map((item, index) => (
                                        <li key={index} onClick={() => handleSearch(item.symbol)}>
                                            <strong>{item.displaySymbol}</strong> - {item.description}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </section>
                    
                    <section className="dashboard-sub-left">
                        <div className="home-content-left">
                            {stockData && stockPrice && (
                                <div>
                                    <div className="home-stock-name">
                                        {stockData.profile.ticker}
                                        <span
                                            className={`stock-price ${
                                                stockPrice.d > 0 ? 'positive' : 'negative'
                                            }`}
                                        >
                                            ${stockPrice.c} ({stockPrice.d > 0 ? '+' : ''}{stockPrice.dp}%)
                                        </span>
                                    </div>

                                    <div className="home-row-content">
                                        {candlestickData && <CandlestickChart data={candlestickData} />}
                                    </div>

                                    <div className="home-row-content">
                                        <p>High Price (Day): ${stockPrice.h}</p>
                                        <p>Low Price (Day): ${stockPrice.l}</p>
                                        <p>Open Price: ${stockPrice.o}</p>
                                        <p>Previous Close: ${stockPrice.pc}</p>
                                        <p>Market Capitalization: ${stockData.profile.marketCapitalization}</p>
                                        <p>Industry: {stockData.profile.finnhubIndustry}</p>
                                        <p>10-Day Average Volume: {stockData.financials['10DayAverageTradingVolume']}</p>
                                        <p>52-Week High: ${stockData.financials['52WeekHigh']}</p>
                                        <p>52-Week Low: ${stockData.financials['52WeekLow']}</p>
                                        <p>52-Week Low Date: {stockData.financials['52WeekLowDate']}</p>
                                        <p>52-Week Return: {stockData.financials['52WeekPriceReturnDaily']}%</p>
                                        <p>Beta: {stockData.financials['beta']}</p>
                                    </div>

                                    <div className="dashboard-row-content">
                                        <h3>COMPANY / Stock Summary will go here</h3> 
                                        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Consectetur nulla sodales mattis, ridiculus luctus vehicula dolor. Pretium litora parturient mi vitae 
                                            sed consequat sagittis; at nullam. Eros eros vehicula lorem dui id viverra hendrerit. Dolor convallis euismod justo; netus ligula imperdiet rutrum maximus.</p>
                                        <p>Lorem ipsum odor amet, consectetuer adipiscing elit. Consectetur nulla sodales mattis, ridiculus luctus vehicula dolor. Pretium litora parturient mi vitae 
                                            sed consequat sagittis; at nullam. Eros eros vehicula lorem dui id viverra hendrerit. Dolor convallis euismod justo; netus ligula imperdiet rutrum maximus.</p>
                                    </div>
                                </div>
                            )}
                            {searchError && <p className="error">{searchError}</p>}
                        </div>
                    </section>
                </section>
                <section className="home-main-right">
                        <div className="home-news-bubble">
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
                        <div className="home-news-bubble">
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
                        <div className="home-news-bubble">
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
                </section>
            </div>
        </div>
    );
}

export default Home;
