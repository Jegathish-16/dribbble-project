import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Signin from './components/Signin/Signin';
import Products from './components/Products/Products';
import Following from './components/Following/Following';
import { AuthProvider } from './components/AuthContext'

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('Discover');

    const handleLoginSuccess = () => {
        console.log('Login successful');
    };

    const handleSelectCategory = (category) => {
        setSelectedCategory(category);
    };

    return (
      <AuthProvider>
        <Router>
            <div>
                <Navbar />
                <Routes>
                    <Route path="/" element={<MainPage selectedCategory={selectedCategory} onSelectCategory={handleSelectCategory} />} />
                    <Route path="/login" element={<Signin onLoginSuccess={handleLoginSuccess} />} />
                </Routes>
            </div>
        </Router>
      </AuthProvider>
    );
};

const MainPage = ({ selectedCategory, onSelectCategory }) => {
    const location = useLocation();
    const showFollowing = location.pathname !== '/login';

    return (
        <>
            {showFollowing && <Following onSelectCategory={onSelectCategory} selectedCategory={selectedCategory} />}
            <Products selectedCategory={selectedCategory} />
        </>
    );
};

export default App;
