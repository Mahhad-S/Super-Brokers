import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/Portfolio.css';

function Portfolio() {
    const [expandedTickers, setExpandedTickers] = useState({});

    const toggleTicker = (ticker) => {
        setExpandedTickers((prev) => ({
            ...prev,
            [ticker]: !prev[ticker],
        }));
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
                    <Link to="/Portfolio" className="porta-tab-link">Portfolio</Link>
                    <Link to="/Dashboard" className="porta-tab-link">Dashboard</Link>
                    <Link to="/About" className="porta-tab-link">About</Link>
                    <Link to="/Help" className="porta-tab-link">Help</Link>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="porta-body-content">
                {/* Trade History Sidebar */}
                <aside className="sidebar-content">
                    <h3>Trade History</h3>
                    <p>1/1/24 AAPL SELL <span className="positive">$500.00</span></p>
                    <p>1/2/24 AAPL BUY <span className="negative">$1000.10</span></p>
                </aside>

                {/* Portfolio Details */}
                <section className="porta-main-content">
                    <h2>Buying Power <span className="buying-power">$X.XX</span></h2>
                    <div className="positions">
                        <h3>Held Positions</h3>
                        
                        {/* Ticker Buttons */}
                        {["AAPL", "GOOGL", "MSFT", "AMZN"].map((ticker) => (
                            <div key={ticker} className="position">
                                <button 
                                    className="ticker-button" 
                                    onClick={() => toggleTicker(ticker)}
                                >
                                    {ticker} {expandedTickers[ticker] ? "▽" : "▷"}
                                </button>
                                <span className="change">+/- $X.XX (+/- % Change)</span>
                                
                                {/* Conditionally rendered additional details */}
                                {expandedTickers[ticker] && (
                                    <div className="ticker-details">
                                        <div>Shares: 10</div>
                                        <div>Avg. Cost: $150</div>
                                        <div>Market Cost: $1550</div>
                                        <div>Portfolio Diversity: 10%</div>
                                        <div>Today's Return: $50</div>
                                        <div>Total Return: $500</div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Portfolio;
