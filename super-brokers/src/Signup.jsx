import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './style/Signup.css';  // Import the new CSS file for Signup styling

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-image-holder">
                <img src="/images/stock.jpg" className="signup-stock-img"/>
            </div>
            <div className="signup-form-container">
                <img 
                    src="/images/Sb-logo.png" 
                    alt="Logo"
                    className="logo"
                />
                <div className="signup-box">
                    <h2>Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="signup-username">
                            <label htmlFor="name" className="signup-form-label">Name</label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name"
                                className="form-control signup-input-rounded"
                                onChange={(e) => setName(e.target.value)}
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
                    <p>Already have an account? <Link to="/login" className="signup-text-primary">Login</Link></p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
