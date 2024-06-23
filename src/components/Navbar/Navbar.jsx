import React, { useState, useContext } from 'react';
import { HiChevronDown } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import links from './links';
import img from './dribbble.webp';
import './Navbar.css';
import AuthContext from '../AuthContext';

function DesktopNavbar() {
    const [showDropdown, setShowDropdown] = useState(null);
    const { isLoggedIn, logout } = useContext(AuthContext);

    const toggleDropdown = (name) => {
        if (showDropdown === name) {
            setShowDropdown(null);
        } else {
            setShowDropdown(name);
        }
    };

    return (
        <div className='nav-container'>
            <nav className='nav-desktop'>
                <ul className='desktop-menu'>
                    {links.map((link) => (
                        <li 
                            key={link.name} 
                            onMouseEnter={() => toggleDropdown(link.name)} 
                            onMouseLeave={() => toggleDropdown(link.name)}
                        >
                            <a href={link.route}>
                                {link.name}
                                {(link.name === 'Find designers' || link.name === 'Courses') && <HiChevronDown style={{ marginLeft: '5px' }} />}
                            </a>
                            {link.name === 'Find designers' && showDropdown === 'Find designers' && (
                                <ul className='dropdown-menu'>
                                    <li>
                                        <a href='/find-designers/topic1'>Designer Search</a>
                                        <p className='note'>Quickly find your next designer</p>
                                    </li>
                                    <li>
                                        <a href='/find-designers/topic2'>Post a job</a>
                                        <p className='note'>The #1 job board for design talent</p>
                                    </li>
                                </ul>
                            )}
                            {link.name === 'Courses' && showDropdown === 'Courses' && (
                                <ul className='dropdown-menu'>
                                    <li>
                                        <a href='/courses/topic1'>UX Diploma</a>
                                        <p className='note'>Learn UX from scratch in 6 months</p>
                                    </li>
                                    <li>
                                        <a href='/courses/topic2'>UI certificate</a>
                                        <p className='note'>12-week UI skill building for designers</p>
                                    </li>
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>
            <div className='nav-logo'>
                <img src={img} alt='dribbble img' />
            </div>
            <div className='nav-actions'>
                <ul className='desktop-menu-btns'>
                    {isLoggedIn ? (
                        <li>
                            <button className="logout-btn" onClick={logout}>Logout</button>
                        </li>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default function Navbar() {
    return (
        <header>
            <DesktopNavbar />
        </header>
    );
}
