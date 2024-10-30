import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
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

    return (
        <div className="help-main-wrapper">
            <div className="help-hot-bar">
                <div className="dashboard-row">
                    {/* Logo on the left */}
                    <div className="dashboard-logo-img">
                        <img src="/images/Sb-logo.png" alt="Logo"/>
                    </div>
                    {/* Tabs as Buttons */}
                    <div className="dashboard-nav-col">
                        <Link to="/Dashboard" className="dashboard-tab-link" >DASHBOARD</Link>
                    </div>
                    <div className="dashboard-nav-col">
                        <Link to="/About" className="dashboard-tab-link" >ABOUT</Link>
                    </div>
                    <div className="dashboard-nav-col">
                        <Link to="/Help" className="dashboard-tab-link" >HELP</Link>
                    </div>
                </div>
            </div>
            <div className="help-main-content">
                <div className="help-items">
                    {helpItems.map((item, index) => (
                        <div key={index} className="items-wrapper">
                            <button onClick={() => toggleItem(index)} className="items-content">
                                <span >{item.title}</span>
                                <span>{openItems[index] ? '−' : '+'}</span>
                            </button>
                            {openItems[index] && (
                                <div className="items-expand">
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