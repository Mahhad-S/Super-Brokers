import React from 'react';
import { useState, useContext } from "react";
import { NavLink } from 'react-router-dom';
import { AuthContext } from "./context/AuthContext";
import "./style/Help.css";

function Help() {
    const [openItems, setOpenItems] = useState({});
    const helpItems = [
        {
            title: "Getting Started Guide",
            content: "Welcome to our platform! This guide will walk you through the basic features and functionalities. Learn how to navigate the dashboard, access key features, and make the most of your experience."
        },
        {
            title: "Frequently Asked Questions",
            content: "Find answers to common questions about account management, system features, and general usage. If you can't find what you're looking for, feel free to contact our support team."
        },
        {
            title: "Technical Support",
            content: "Having technical issues? Learn how to troubleshoot common problems, reset your password, or get in touch with our technical support team for assistance."
        },
        {
            title: "Account Management",
            content: "Learn how to manage your account settings, update your profile information, and customize your preferences for a better experience."
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
                                <span >{item.title}</span>
                                <span>{openItems[index] ? '−' : '+'}</span>
                            </button>
                            {openItems[index] && (
                                <div className="help-items-expand">
                                    {item.content}
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