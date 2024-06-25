import React from 'react';
import './SearchSuggestions.css';

const SearchSuggestions = ({ suggestions, onSelectSuggestion }) => {
    const limitedSuggestions = suggestions.slice(0, 5);
    
    return (
        <div className="suggestions-container">
            {limitedSuggestions.map((suggestion, index) => (
                <div 
                    key={index} 
                    className="suggestion-item" 
                    onClick={() => onSelectSuggestion(suggestion)}
                >
                    {suggestion.prName}
                </div>
            ))}
        </div>
    );
};

export default SearchSuggestions;
