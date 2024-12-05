import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import './style/Portfolio.css';

function Portfolio() {
    const [expandedTickers, setExpandedTickers] = useState({});
    const [portfolio, setPortfolio] = useState([]);
    const [virtualBalance, setVirtualBalance] = useState(0);
    const [tradeHistory, setTradeHistory] = useState([]);
    const [showAllTrades, setShowAllTrades] = useState(false);
    const { userId } = useContext(AuthContext);
    const [showDropdown, setShowDropdown] = useState(false);
    const [stockDataCache, setStockDataCache] = useState({});
    const { logout } = useContext(AuthContext);

    // Fetch portfolio and balance on component mount
    useEffect(() => {
        if (userId) {
            const fetchPortfolioData = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/stocks/user/portfolio/${userId}`);
                    if (response.status === 200) {
                        setPortfolio(response.data.portfolio);
                        setVirtualBalance(response.data.virtualBalance);
                    }
                } catch (error) {
                    console.error("Error fetching portfolio data:", error);
                }
            };

            fetchPortfolioData();
        }
    }, [userId]);

    // Fetch trade history on component mount
    useEffect(() => {
        if (userId) {
            const fetchTradeHistory = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/api/trades/user/${userId}`);
                    if (response.status === 200) {
                        setTradeHistory(response.data.trades);
                    }
                } catch (error) {
                    console.error("Error fetching trade history:", error);
                }
            };

            fetchTradeHistory();
        }
    }, [userId]);

    // Toggle ticker details
    const toggleTicker = async (ticker) => {
        setExpandedTickers((prev) => ({
            ...prev,
            [ticker]: !prev[ticker],
        }));

        // If the ticker is expanded and not yet cached, fetch stock data
        if (!expandedTickers[ticker] && !stockDataCache[ticker]) {
            try {
                const response = await axios.get(`http://localhost:3001/api/stocks/stock-price/${ticker}`);
                if (response.status === 200) {
                    setStockDataCache((prevCache) => ({
                        ...prevCache,
                        [ticker]: response.data,
                    }));

                    // Update the portfolio with additional data for the expanded ticker
                    setPortfolio((prevPortfolio) =>
                        prevPortfolio.map((position) =>
                            position.stockSymbol === ticker
                                ? {
                                      ...position,
                                      currentPrice: response.data.c,
                                      previousClose: response.data.pc,
                                      marketCost: response.data.c * position.quantity,
                                      totalReturn: (response.data.c - position.averagePrice) * position.quantity,
                                      todayReturn: (response.data.c - response.data.pc) * position.quantity,
                                      portfolioDiversity: ((response.data.c * position.quantity) /
                                          prevPortfolio.reduce((acc, pos) => acc + pos.quantity * pos.averagePrice, 0)) * 100,
                                      dayChange: {
                                          dollarChange: (response.data.c - response.data.pc).toFixed(2),
                                          percentChange: (((response.data.c - response.data.pc) / response.data.pc) * 100).toFixed(2),
                                      },
                                  }
                                : position
                        )
                    );
                }
            } catch (error) {
                console.error(`Error fetching stock data for ${ticker}:`, error);
            }
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const toggleShowAllTrades = () => {
        setShowAllTrades((prev) => !prev);
    };

    return (
        <div className="porta-main-wrapper">
            {/* Top Navigation Bar */}
            <div className="porta-hot-bar">
                <div className="porta-logo-img">
                    <img src="/images/Sb-logo.png" alt="Logo" />
                </div>
                {/* Navigation Links */}
                <div className="porta-nav-links">
                    <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "porta-tab-link active" : "porta-tab-link"}>
                        Dashboard
                    </NavLink>
                    <NavLink to="/Portfolio" className={({ isActive }) => isActive ? "porta-tab-link active" : "porta-tab-link"}>
                        Portfolio
                    </NavLink>
                    <NavLink to="/About" className={({ isActive }) => isActive ? "porta-tab-link active" : "porta-tab-link"}>
                        About
                    </NavLink>
                    <NavLink to="/Help" className={({ isActive }) => isActive ? "porta-tab-link active" : "porta-tab-link"}>
                        Help
                    </NavLink>
                </div>
                <button className="porta-user" onClick={toggleDropdown}>
                    <img src="/images/user-icon.png" className="porta-user-icon" alt="User Icon" />
                </button>
                {showDropdown && (
                    <div className="porta-dropdown-menu">
                        <NavLink to="/dashboard" className="porta-dropdown-item">Dashboard</NavLink>
                        <button onClick={logout} className="porta-dropdown-item">Log Out</button>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="porta-body-content">
                {/* Trade History Sidebar */}
                <aside className="porta-sidebar-content">
                    <h3>Trade History</h3>
                    {tradeHistory.length > 0 ? (
                        (showAllTrades ? tradeHistory : tradeHistory.slice(0, 10)).map((trade, index) => (
                            <p key={index}>
                                {new Date(trade.date).toLocaleDateString()} {trade.stockSymbol} {trade.transactionType.toUpperCase()} 
                                <span className={`porta-${trade.transactionType === 'buy' ? 'negative' : 'positive'}`}>
                                    ${trade.transactionValue.toFixed(2)}
                                </span>
                            </p>
                        ))
                    ) : (
                        <p>No trades available</p>
                    )}
                    {tradeHistory.length > 10 && (
                        <button onClick={toggleShowAllTrades}>
                            {showAllTrades ? "Show Less" : "Show More"}
                        </button>
                    )}
                </aside>

                {/* Portfolio Details */}
                <section className="porta-main-content">
                    <h2>Buying Power <span className="porta-buying-power">${virtualBalance.toFixed(2)}</span></h2>
                    <div className="porta-positions">
                        <h3>Held Positions</h3>

                        {/* Ticker Buttons */}
                        {portfolio.length > 0 ? (
                            portfolio.map((position) => (
                                <div key={position.stockSymbol} className="porta-position">
                                    <button
                                        className="porta-ticker-button"
                                        onClick={() => toggleTicker(position.stockSymbol)}
                                    >
                                        {position.stockSymbol} {expandedTickers[position.stockSymbol] ? "▽" : "▷"}
                                    </button>
                                    <span className="porta-change">
                                        {position.dayChange
                                            ? `+/- $${position.dayChange.dollarChange} (+/- ${position.dayChange.percentChange}%)`
                                            : 'Loading...'}
                                    </span>

                                    {/* Conditionally rendered additional details */}
                                    {expandedTickers[position.stockSymbol] && (
                                        <div className="porta-ticker-details">
                                            <div>Shares: {position.quantity}</div>
                                            <div>Avg. Cost: ${position.averagePrice.toFixed(2)}</div>
                                            <div>Market Cost: ${position.marketCost ? position.marketCost.toFixed(2) : 'Loading...'}</div>
                                            <div>Portfolio Diversity: {position.portfolioDiversity ? `${position.portfolioDiversity.toFixed(2)}%` : 'Loading...'}</div>
                                            <div>Today's Return: ${position.todayReturn ? position.todayReturn.toFixed(2) : 'Loading...'}</div>
                                            <div>Total Return: ${position.totalReturn ? position.totalReturn.toFixed(2) : 'Loading...'}</div>
                                        </div>
                                    )}
                                </div>
                            ))
                        ) : (
                            <p>No positions held</p>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Portfolio;
