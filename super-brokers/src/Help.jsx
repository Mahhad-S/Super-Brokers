import React from 'react';
import { useState, useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import "./style/Help.css";

function Help() {
    const [openItems, setOpenItems] = useState({});
    const helpItems = [
        {
            title: "Getting Started",
            content: (
                <div>
                    <p>Welcome to our platform! To get started, follow these steps:</p>
                    <ol>
                        <li>Create an account by signing up with your email and a secure password.</li>
                        <li>Verify your email address by clicking on the link sent to your inbox.</li>
                        <li>Log in to your account and complete your profile.</li>
                        <li>Explore our features and start using the platform to its fullest potential.</li>
                    </ol>
                </div>
            )
        },
        {
            title: "Account Management",
            content: (
                <div>
                    <p>Manage your account settings with ease:</p>
                    <ul>
                        <li><strong>Update Profile:</strong> Edit your personal information and preferences.</li>
                        <li><strong>Change Password:</strong> Ensure your account is secure by updating your password regularly.</li>
                        <li><strong>Privacy Settings:</strong> Control who can see your information and activity.</li>
                        <li><strong>Delete Account:</strong> If you wish to leave, you can delete your account permanently.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Using the Dashboard",
            content: (
                <div>
                    <p>Navigate and utilize the dashboard effectively:</p>
                    <ul>
                        <li><strong>Overview:</strong> Get a quick summary of your recent activities and statistics.</li>
                        <li><strong>Reports:</strong> Generate detailed reports to analyze your performance.</li>
                        <li><strong>Notifications:</strong> Stay updated with real-time alerts and messages.</li>
                        <li><strong>Customization:</strong> Personalize your dashboard layout and widgets.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Support and Resources",
            content: (
                <div>
                    <p>Need help? We’ve got you covered:</p>
                    <ul>
                        <li><strong>FAQ:</strong> Find answers to the most frequently asked questions.</li>
                        <li><strong>Contact Support:</strong> Reach out to our support team for personalized assistance.</li>
                        <li><strong>Community Forums:</strong> Join discussions and get help from other users.</li>
                        <li><strong>Tutorials:</strong> Watch video tutorials to learn how to use our features.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Security Tips",
            content: (
                <div>
                    <p>Keep your account secure with these tips:</p>
                    <ul>
                        <li><strong>Use Strong Passwords:</strong> Create passwords that are hard to guess and include a mix of letters, numbers, and symbols.</li>
                        <li><strong>Enable Two-Factor Authentication:</strong> Add an extra layer of security to your account.</li>
                        <li><strong>Beware of Phishing:</strong> Do not click on suspicious links or provide your credentials to untrusted sources.</li>
                        <li><strong>Regular Updates:</strong> Keep your software and applications up to date to protect against vulnerabilities.</li>
                    </ul>
                </div>
            )
        },
        {
            title: "Troubleshooting",
            content: (
                <div>
                    <p>Resolve common issues with these troubleshooting steps:</p>
                    <ul>
                        <li><strong>Login Issues:</strong> Ensure you are using the correct credentials and check your internet connection.</li>
                        <li><strong>Performance Problems:</strong> Clear your browser cache and cookies, and try using a different browser.</li>
                        <li><strong>Feature Not Working:</strong> Make sure you have the latest version of the application and check for any service outages.</li>
                        <li><strong>Contact Support:</strong> If the issue persists, reach out to our support team for further assistance.</li>
                    </ul>
                </div>
            )
        }
    ];
    
    const toggleItem = (index) => {
        setOpenItems(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };
    const [showDropdown, setShowDropdown] = useState(false);
    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }; 
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <div className="help-main-wrapper">
            {/* Top Navigation Bar */}
            <div className="help-hot-bar">
                <div className="help-logo-img">
                    <img src="/images/Sb-logo.png" alt="Logo" />
                </div>
                {/* Navigation Links */}
                <div className="help-nav-links">
                    {!isAuthenticated ? (
                        <>
                            <NavLink to="/" className={({ isActive }) => isActive ? "help-tab-link active" : "help-tab-link"}>
                                Home
                            </NavLink>
                        </>
                    ) : (
                        <>
                            <NavLink to="/Dashboard" className={({ isActive }) => isActive ? "help-tab-link active" : "help-tab-link"}>
                                Dashboard
                            </NavLink>
                            <NavLink to="/Portfolio" className={({ isActive }) => isActive ? "help-tab-link active" : "help-tab-link"}>
                                Portfolio
                            </NavLink>
                        </>
                    )}
                    <NavLink to="/About" className={({ isActive }) => isActive ? "help-tab-link active" : "help-tab-link"}>
                        About
                    </NavLink>
                    <NavLink to="/Help" className={({ isActive }) => isActive ? "help-tab-link active" : "help-tab-link"}>
                        Help
                    </NavLink>
                </div>
                <button className="help-user" onClick={toggleDropdown}>
                    <img src="/images/user-icon.png" className="help-user-icon" alt="User Icon" />
                </button>
                {showDropdown && (
                    <div className="help-dropdown-menu">
                        {!isAuthenticated ? (
                            <>
                                <NavLink to="/" className="help-dropdown-item">Home</NavLink>
                                <NavLink to="/login" className="help-dropdown-item">Login</NavLink>
                                <NavLink to="/register" className="help-dropdown-item">Sign Up</NavLink>
                            </>
                        ) : (
                            <>
                                <NavLink to="/dashboard" className="help-dropdown-item">Dashboard</NavLink>
                                <button onClick={logout} className="help-dropdown-item">Log Out</button>
                            </>
                        )}
                    </div>
                )}
            </div>

            <div className="help-main-content">
                <div className="help-items">
                    {helpItems.map((item, index) => (
                        <div key={index} className="items-wrapper">
                            <button onClick={() => toggleItem(index)} className="help-items-content">
                                <span>{openItems[index] ? '−' : '+'}</span>
                                <span >{item.title}</span>
                            </button>
                            {openItems[index] && (
                                <div className="help-items-expand">
                                    <div className="help-items-expand-content">
                                        {item.content}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}


export default Help;