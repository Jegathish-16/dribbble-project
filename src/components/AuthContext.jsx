import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('username');
        if (storedUser) {
            setUser({ username: storedUser });
        }
    }, []);

    const login = (userInfo) => {
        setUser(userInfo);
        const storedLikedProducts = JSON.parse(localStorage.getItem(`likedProducts_${userInfo.username}`)) || {};
        setLikedProducts(storedLikedProducts);
        localStorage.setItem('username', userInfo.username);
    };

    const logout = () => {
        if (user) {
            setUser(null);
            localStorage.removeItem('username');
        }
    };

    const [likedProducts, setLikedProducts] = useState({});

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user, likedProducts, setLikedProducts }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
