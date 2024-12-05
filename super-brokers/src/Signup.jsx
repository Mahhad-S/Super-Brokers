import { useState } from "react";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './style/Signup.css';  // Import the new CSS file for Signup styling

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!username || !email || !password) {
            alert("All fields are required");
            return;
        }
    
        axios.post('http://localhost:3001/register', { username, email, password })
            .then(result => {
                console.log(result);
                if (result.status === 201) {
                    navigate("/login");
                } else {
                    alert(result.data.message); // Show error message
                }
            })
            .catch(err => {
                console.log(err);
                alert(err.response?.data?.message || 'An error occurred'); // Show error message
            });
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-navbar">
                <div className="signup-navbar-user">
                    <button className="signup-user-icon" onClick={toggleDropdown}>
                        <img src="/images/SB-logo.png" alt="User Icon" />
                    </button>
                    {showDropdown && (
                        <div className="signup-dropdown-menu">
                            <NavLink to="/" className="signup-dropdown-item">Home</NavLink>
                            <NavLink to="/login" className="signup-dropdown-item">Login</NavLink>
                            <NavLink to="/register" className="signup-dropdown-item">Sign Up</NavLink>
                            <NavLink to="" className="dashboard-dropdown-item">Log Out</NavLink>
                        </div>
                    )}
                </div>
            </div>
            <div className="signup-main-content">
                <div className="signup-image-holder">
                    <img src="/images/stock.jpg" className="signup-stock-img"/>
                </div>
                <div className="signup-form-container">
                    <img 
                        src="/images/SB-banner.png" 
                        alt="Logo"
                        className="logo"
                    />
                    <div className="signup-box">
                        <h2>Sign Up</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="signup-username">
                                <label htmlFor="username" className="signup-form-label">Name</label>
                                <input 
                                    type="text"
                                    placeholder="Enter Name"
                                    autoComplete="off"
                                    name="username"
                                    className="form-control signup-input-rounded"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="signup-email">
                                <label htmlFor="email" className="signup-form-label">Email</label>
                                <input 
                                    type="email"
                                    placeholder="Enter Email"
                                    autoComplete="off"
                                    name="email"
                                    className="form-control signup-input-rounded"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="signup-password">
                                <label htmlFor="password" className="signup-form-label">Password</label>
                                <input 
                                    type="password"
                                    placeholder="Enter Password"
                                    name="password"
                                    className="form-control signup-input-rounded"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" className="signup-submit-button">Register</button>
                        </form>
                        <p>Already have an account? <NavLink to="/login" className="signup-text-primary">Login</NavLink></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;
