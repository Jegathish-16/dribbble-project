import React, { useEffect, useState, useContext } from 'react';
import { productObject } from '../../Constants';
import { HiSearch } from 'react-icons/hi';
import './Products.css';
import AuthContext from '../AuthContext';
import { toast } from 'react-toastify';
import SearchSuggestions from '../SearchSuggestions/SearchSuggestions'

const Products = ({ selectedCategory }) => {
    const { user, likedProducts, setLikedProducts } = useContext(AuthContext);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(productObject);
    const [filterDataBasedProduct, setFilterDataBasedProduct] = useState(productObject);
    const [suggestions, setSuggestions] = useState([]);

    const openModal = (product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setModalOpen(false);
    };

    useEffect(() => {
        const filteredProducts = selectedCategory === 'Discover'
            ? productObject
            : productObject.filter(product =>
                product.category === selectedCategory || product.type === selectedCategory
            );
        setFilterDataBasedProduct(filteredProducts);
        setFilteredData(filteredProducts);
    }, [selectedCategory]);

    const handleInputSearch = (e) => {
        const value = e.target.value;
        setSearch(value);
        if (value === "") {
            setFilteredData(filterDataBasedProduct);
            setSuggestions([]);
        } else {
            const filterProduct = filterDataBasedProduct.filter((data) => {
                if (
                    data.prName.toLowerCase().includes(value.trim().toLowerCase()) ||
                    data.category.toLowerCase().includes(value.trim().toLowerCase())
                ) {
                    return data;
                }
                return null;
            });
            setFilteredData(filterProduct);
            setSuggestions(filterProduct);
        }
    };

    const handleSuggestionSelect = (suggestion) => {
        setSearch(suggestion.prName);
        setFilteredData([suggestion]);
        setSuggestions([]);
    };

    const toggleLike = (index) => {
        if (!user) {
            toast.error("You need to be logged in to like products.");
            return;
        }

        const updatedProducts = [...filteredData];
        const product = updatedProducts[index];

        if (likedProducts[product.prName]) {
            toast.info("You have already liked this product.");
            return;
        }

        const newLikedProducts = {
            ...likedProducts,
            [product.prName]: true
        };

        product.likeTarget++;
        setFilteredData(updatedProducts);
        setLikedProducts(newLikedProducts);
        localStorage.setItem(`likedProducts_${user.username}`, JSON.stringify(newLikedProducts));
    };

    return (
        <div>
            <div className="main-search">
                <HiSearch className='search-icon' />
                <input 
                    type="text" 
                    value={search}
                    onChange={handleInputSearch} 
                    placeholder="Search" 
                    className="search-input"
                />
                {suggestions.length > 0 && (
                    <SearchSuggestions 
                        suggestions={suggestions} 
                        onSelectSuggestion={handleSuggestionSelect}
                    />
                )}
            </div>

            <div className="container">
                <div className="product-grid">
                    {filteredData.map((product, index) => (
                        <div className="product-item" key={index} onClick={() => openModal(product)}>
                            <div className="product-image">
                                <img src={product.prImg} className='product-img' alt={product.prName} />
                                <div className="product-overlay">
                                    <div className="overlay-content">
                                        <div className="product-name">
                                            <h2>{product.prName}</h2>
                                        </div>
                                        <div 
                                            className={`product-actions ${likedProducts[product.prName] ? 'liked' : ''}`}
                                        >
                                            <div 
                                                className={`action-button ${likedProducts[product.prName] ? 'liked' : ''}`} 
                                                onClick={(e) => {e.stopPropagation(); toggleLike(index);}}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={likedProducts[product.prName] ? "#ff0000" : "#9e9ea7"} className="action-icon">
                                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="product-details">
                                <div className="studio-info">
                                    <div className="user-post">
                                        <img src={product.userUploadIcon} alt="" className="user-icon" />
                                    </div>
                                    <div className="studio-name">
                                        <h2>{product.studioName}</h2>
                                    </div>
                                    <div className="batch">
                                        <p className="batch-option">{product.batchOption}</p>
                                    </div>
                                    <div className={`like ${likedProducts[product.prName] ? 'liked' : ''}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="shot-icon" fill={likedProducts[product.prName] ? "#ff0000" : "#9e9ea7"}>
                                            <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                        </svg>
                                        <p className="like-count">{product.likeTarget}</p>
                                    </div>
                                    <div className="watch-shot">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="shot-icon">
                                            <path d="M12 15a3 3 0 100-6 3 3 0 000 6zm0 8c-5.438 0-10-4.577-10-11S6.562 1 12 1s10 4.577 10 11-4.562 11-10 11zm0-2c3.937 0 8-3.48 8-9s-4.063-9-8-9-8 3.48-8 9 4.063 9 8 9z" />
                                            <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
                                        </svg>
                                        <p className="watch-time">{product.watchTime}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {modalOpen && selectedProduct && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal" onClick={(e) => e.stopPropagation()}>
                            <img src={selectedProduct.prImg} alt={selectedProduct.prName} className="modal-image" />
                            <div className="product-info">
                                <h2>{selectedProduct.prName}</h2>
                                <p><strong>Studio Name:</strong> {selectedProduct.studioName}</p>
                                <p><strong>Category:</strong> {selectedProduct.category}</p>
                                <p><strong>Views:</strong> {selectedProduct.watchTime}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
