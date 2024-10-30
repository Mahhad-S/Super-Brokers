import React from 'react';
import { Link } from "react-router-dom";
function About() {
    return (
        <div className="d-flex flex-column min-vh-100 bg-secondary position-relative">
            {/* Hot Bar at the top with brown background */}
            <div className="hot-bar w-100" style={{ backgroundColor: '#00FF00' }}>
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
                            DASHBOARD
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
                            ABOUT
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
                            HELP
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default About;