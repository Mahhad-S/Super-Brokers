import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import '..server/dist/assets/Login.css';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
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
        <div className="login-page">
            <div className="left-section">
                {/* Placeholder for image */}
                <div className="image-placeholder"></div>
            </div>

            <div className="right-section">
                <div className="login-box">
                    <div className="logo-placeholder">LOGO</div>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label htmlFor="email">Username</label>
                            <input 
                                type="email"
                                placeholder="Enter Username"
                                autoComplete="off"
                                className="form-input"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="password">Password</label>
                            <input 
                                type="password"
                                placeholder="Enter Password"
                                className="form-input"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="button-group">
                            <button type="submit" className="btn-signup">Sign up</button>
                            <button type="submit" className="btn-login">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="user-icon">USER</div>
        </div>
    );
}

export default Login;
