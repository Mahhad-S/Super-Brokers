import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './style/Portfolio.css';

function Portfolio() {
    const [expandedTickers, setExpandedTickers] = useState({});

    const toggleTicker = (ticker) => {
        setExpandedTickers((prev) => ({
            ...prev,
            [ticker]: !prev[ticker],
        }));
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
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
                    <NavLink to="/About" className={({ isActive }) => isActive ? "porta-tab-link active" : "porta-tab-link"}>
                        About
                    </NavLink>
                    <NavLink to="/Help" className={({ isActive }) => isActive ? "porta-tab-link active" : "porta-tab-link"}>
                        Help
                    </NavLink>
                    <NavLink to="/Portfolio" className={({ isActive }) => isActive ? "porta-tab-link active" : "porta-tab-link"}>
                        Portfolio
                    </NavLink>
                </div>
                <button className="porta-user" onClick={toggleDropdown}>
                    <img src="/images/SB-logo.png" alt="User Icon" />
                </button>
                {showDropdown && (
                    <div className="porta-dropdown-menu">
                        <NavLink to="/" className="porta-dropdown-item">Home</NavLink>
                        <NavLink to="/login" className="porta-dropdown-item">Login</NavLink>
                        <NavLink to="/register" className="porta-dropdown-item">Sign Up</NavLink>
                        <NavLink to="" className="porta-dropdown-item">Log Out</NavLink>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="porta-body-content">
                {/* Trade History Sidebar */}
                <aside className="porta-sidebar-content">
                    <h3>Trade History</h3>
                    <p>1/1/24 AAPL SELL <span className="porta-positive">$500.00</span></p>
                    <p>1/2/24 AAPL BUY <span className="porta-negative">$1000.10</span></p>
                </aside>

                {/* Portfolio Details */}
                <section className="porta-main-content">
                    <h2>Buying Power <span className="porta-buying-power">$X.XX</span></h2>
                    <div className="porta-positions">
                        <h3>Held Positions</h3>
                        
                        {/* Ticker Buttons */}
                        {["AAPL", "GOOGL", "MSFT", "AMZN"].map((ticker) => (
                            <div key={ticker} className="porta-position">
                                <button 
                                    className="porta-ticker-button" 
                                    onClick={() => toggleTicker(ticker)}
                                >
                                    {ticker} {expandedTickers[ticker] ? "▽" : "▷"}
                                </button>
                                <span className="porta-change">+/- $X.XX (+/- % Change)</span>
                                
                                {/* Conditionally rendered additional details */}
                                {expandedTickers[ticker] && (
                                    <div className="porta-ticker-details">
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
