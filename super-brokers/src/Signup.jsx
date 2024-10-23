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
        <div className="signup-wrapper d-flex">
            <div className="image-holder">
                {/* Image or placeholder for the left side */}
            </div>
            <div className="signup-form-container d-flex justify-content-center align-items-center">
                <img 
                            src="/images/Sb-logo.png" 
                            alt="Logo"
                            className="logo"
                />
                <div className="signup-box p-4 bg-white shadow-sm rounded">
                    <h2 className="text-center mb-4">Sign Up</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input 
                                type="text"
                                placeholder="Enter Name"
                                autoComplete="off"
                                name="name"
                                className="form-control input-rounded"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input 
                                type="email"
                                placeholder="Enter Email"
                                autoComplete="off"
                                name="email"
                                className="form-control input-rounded"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input 
                                type="password"
                                placeholder="Enter Password"
                                name="password"
                                className="form-control input-rounded"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 btn-lg input-rounded">Register</button>
                    </form>
                    <p className="text-center mt-3">
                        Already have an account? <Link to="/login" className="text-primary">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
