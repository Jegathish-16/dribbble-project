import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usersData from './users.json';
import './Signin.css';
// import img from './css1.png';
import AuthContext from '../AuthContext';

function Signin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();

        const user = usersData.users.find(user => user.username === username && user.password === password);
        if (user) {
            console.log('Login successful:', user);
            login(user);
            toast.success('Login successful!');
            setTimeout(() => {
                navigate('/');
            }, 1500);
        } else {
            console.log('Login failed for username:', username);
            alert('Invalid username or password');
        }
    };

    return (
        <div className="container">
            <ToastContainer />
            {/* <div className="side-image">
                <img src={img} alt="Side Graphic" />
            </div> */}
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
