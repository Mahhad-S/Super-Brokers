import React from 'react';
import { useState } from "react";
import { Link } from "react-router-dom";
import "./style/Home.css";

function Home() {
    return (
        <div className="main-wrapper">
            {/* Hot Bar at the top with brown background */}
            <div className="hot-bar w-100" style={{ backgroundColor: '#ADD8E6' }}>
                <div className="row align-items-center no-gutters">
                    {/* Logo on the left */}
                    <div className="col-auto d-flex align-items-center">
                        <img 
                            src="/images/Sb-logo.png" // Replace with the path to your PNG logo
                            alt="Logo" 
                            style={{ width: '100px', height: '100px', border: '0px' }} // Adjust height as needed
                        />
                    </div>

                    {/* Tabs as Buttons */}
                    <div className="col-auto d-flex justify-content-center align-items-center">
                        <Link to="/Dashboard"
                            className="folder-tab text-center" 
                            style={{
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #ddd',
                                borderBottom: 'none',
                                padding: '7px 20px',
                                fontSize: '16px',
                                height: '40px',
                                marginTop: '60px',
                                zIndex: 1,
                                cursor: 'pointer', 
                                outline: 'none',
                                textDecoration: 'none', 
                                color: 'inherit' 
                            }}
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div className="col-auto d-flex justify-content-center align-items-center">
                    <Link to="/About"
                            className="folder-tab text-center" 
                            style={{
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #ddd',
                                borderBottom: 'none',
                                padding: '7px 20px',
                                fontSize: '16px',
                                height: '40px',
                                marginTop: '60px',
                                zIndex: 1,
                                cursor: 'pointer', 
                                outline: 'none',
                                textDecoration: 'none', 
                                color: 'inherit' 
                            }}
                        >
                            About
                        </Link>
                    </div>
                    <div className="col-auto d-flex justify-content-center align-items-center">
                    <Link to="/Help"
                            className="folder-tab text-center" 
                            style={{
                                borderTopLeftRadius: '10px',
                                borderTopRightRadius: '10px',
                                backgroundColor: '#f8f9fa',
                                border: '1px solid #ddd',
                                borderBottom: 'none',
                                padding: '7px 20px',
                                fontSize: '16px',
                                height: '40px',
                                marginTop: '60px',
                                zIndex: 1,
                                cursor: 'pointer', 
                                outline: 'none',
                                textDecoration: 'none', 
                                color: 'inherit' 
                            }}
                        >
                            Help
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main content area with blurred background */}
            <div 
                className="d-flex mt-3" 
                style={{ 
                    width: 'calc(100% - 100px)', // Adjust width to give padding from edges
                    margin: '20px auto', // Center the content with auto margins
                    backdropFilter: 'blur(10px)', // Make the background blurry
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Semi-transparent background
                    padding: '20px', // Add padding to the content area
                }}
            >
                {/* Left side: Search bar and rows */}
                <div className="d-flex flex-fill flex-column" style={{ flex: '1', minWidth: '0', marginRight: '150px', marginLeft: '100px'}}>
                    {/* Row 1 - Search Bar */}
                    <div className="d-flex mb-4"> {/* Increased bottom margin */}
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Search..." 
                            style={{ flex: 1 }} 
                        />
                        <button className="btn btn-primary ms-2">Search</button>
                    </div>
                    <div style={{marginBottom: '20px', fontSize: '20px'}}> STOCK</div>
                    {/* Normal Row with a line of text */}
                    <div className="bg-light p-4 mb-4 text-center" style={{ borderRadius: '10px' }}> {/* Added border radius */}
                        Row 1
                    </div>

                    {/* Row 2 */}
                    <div className="bg-light p-4 mb-4 text-center" style={{ borderRadius: '10px' }}> {/* Added border radius */}
                        Row 2
                    </div>

                    {/* Row 3 */}
                    <div className="bg-light p-4 text-center" style={{ borderRadius: '10px' }}>
                        Row 3
                    </div>
                </div>

                {/* Right side: Bubble rows */}
                <div className="d-flex flex-column" style={{ flex: '1', minWidth: '0px' }}>
                    <div className="bubble mb-4 text-center"> {/* Increased bottom margin */}
                        Bubble 1
                    </div>
                    <div className="bubble mb-4 text-center"> {/* Increased bottom margin */}
                        Bubble 2
                    </div>
                    <div className="bubble text-center">
                        Bubble 3
                    </div>
                </div>
            </div>

            <style jsx>{`
                .bubble {
                    background-color: #f8f9fa;
                    border-radius: 50px; /* Makes the bubble shape */
                    padding: 5px; /* Adjusted padding for smaller bubbles */
                    border: 1px solid #ddd; /* Border for bubble */
                    min-width: 200px; /* Decreased minimum width for bubble */
                    min-height: 200px; /* Decreased minimum height for bubble */
                    display: flex;
                    margin-right: 150px;
                    margin-left: 200px;
                    align-items: center; /* Centering text vertically */
                    justify-content: center; /* Centering text horizontally */
                    transition: all 0.3s ease; /* Smooth transition */
                }
            `}</style>
        </div>
    );
}

export default Home;
