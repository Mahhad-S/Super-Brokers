import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for visibility toggle
import './style/Login.css';  // Add this for styling

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
    const navigate = useNavigate();
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate("/dashboard");
                } else {
                    alert(result.data); // Show error message
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-wrapper">
            <div className="login-navbar">
                <div className="login-navbar-user">
                    <button className="login-user-icon" onClick={toggleDropdown}>
                        <img src="/images/SB-logo.png" alt="User Icon" />
                    </button>
                    {showDropdown && (
                        <div className="login-dropdown-menu">
                            <Link to="/" className="login-dropdown-item">Home</Link>
                            <Link to="/login" className="login-dropdown-item">Login</Link>
                            <Link to="/register" className="login-dropdown-item">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="login-main-content">
                <div className="login-image-holder">
                    <img src="/images/stock.jpg" className="login-stock-img"/>
                </div>
                <div className="login-form-container">
                    <img 
                        src="/images/SB-banner.png" 
                        alt="Logo"
                        className="logo"
                    />
                    <div className="login-box">
                        <h2>Log in</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="login-email">
                                <label htmlFor="email" className="login-form-label">Username</label>
                                <input 
                                    type="email"
                                    placeholder="Enter Username"
                                    autoComplete="off"
                                    name="email"
                                    className="form-control login-input-rounded"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="login-password">
                                <label htmlFor="password" className="login-form-label">Password</label>
                                <input 
                                    type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                                    placeholder="Enter Password"
                                    name="password"
                                    className="form-control login-input-rounded"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {/* Icon to toggle show/hide password */}
                                <span 
                                    className="login-password-toggle-icon" 
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </span>
                            </div>
                            <button type="submit" className="login-submit-button">Log In</button>
                        </form>
                        <p>Don't have an account?<Link to="/register" className="login-text-primary"> Sign up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
