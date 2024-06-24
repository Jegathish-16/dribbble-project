import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signin.css';
import AuthContext from '../AuthContext';

function Signin({ onLoginSuccess }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        if (username.trim() !== '' && password.trim() !== '') {
            console.log('Login successful for username:', username);
            login({ username: username });
            toast.success('Login successful!');
            localStorage.setItem('username', username);
            setTimeout(() => {
                navigate('/');
                onLoginSuccess();
            }, 1500);
        } else {
            console.log('Login failed for username:', username);
            alert('Please enter valid username and password');
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            <div className="login-container">
                <h2>Login to Dribbble</h2>
                <form onSubmit={handleLogin}>
                    <div className="or-divider">Login with Email or Username</div>
                    <input 
                        type="text" 
                        placeholder="Username or Email" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}

Signin.propTypes = {
    onLoginSuccess: PropTypes.func.isRequired,
};

export default Signin;
