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

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === 'Success') {
                    navigate('/home');
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="login-wrapper d-flex">
            <div className="image-holder">
                {/* Image or placeholder for the left side */}
            </div>
            <div className="login-form-container d-flex justify-content-center align-items-center">
                <img 
                            src="/images/Sb-logo.png" 
                            alt="Logo"
                            className="logo"
                />
                <div className="login-box p-4 bg-white shadow-sm rounded">
                    <h2 className="text-center mb-4">Log in</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Username</label>
                            <input 
                                type="email"
                                placeholder="Enter Username"
                                autoComplete="off"
                                name="email"
                                className="form-control input-rounded"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                                placeholder="Enter Password"
                                name="password"
                                className="form-control input-rounded"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {/* Icon to toggle show/hide password */}
                            <span 
                                className="password-toggle-icon" 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button type="submit" className="btn btn-primary w-100 btn-lg input-rounded">Log In</button>
                    </form>
                    <p className="text-center mt-3">
                        Don't have an account? <Link to="/register" className="text-primary">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
