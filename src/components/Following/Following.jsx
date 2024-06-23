import React, { useState } from 'react';
// import { HiChevronDown } from 'react-icons/hi';
import './Following.css';
import links from './links';

const followingLinks = [
    'Following',
    'Popular',
    'New'
];

function Following({ onSelectCategory, selectedCategory }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleCategoryClick = (category) => {
        onSelectCategory(category);
        setShowDropdown(false);
    };

    console.log(showDropdown)
    

    return (
        <div className='categories-container'>
            <div className='following-container'>
            <select onChange={(e)=>handleCategoryClick(e.target.value)}>
                    {followingLinks.map((link,index) => (
                        <option key={index} value={link.toLowerCase()}>{link}</option>
                    ))}
            </select>
            </div>
            <div className='category-links'>
                {links.map((link) => (
                    <button
                        key={link.name}
                        className={`category-button ${selectedCategory === link.name ? 'selected' : ''}`}
                        onClick={() => handleCategoryClick(link.name)}
                    >
                        {link.name}
                    </button>
                ))}
            </div>
            <div className='filter'>
                <div>Filters</div>
            </div>
        </div>
    );
}

export default Following;
