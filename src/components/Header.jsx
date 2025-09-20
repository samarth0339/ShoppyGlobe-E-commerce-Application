import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalItems } from '../store/slices/cartSlice';
import { selectSearchTerm, setSearchTerm } from '../store/slices/searchSlice';
import './Header.css';

const Header = () => {
  const totalItems = useSelector(selectCartTotalItems);
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  const [localSearch, setLocalSearch] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    dispatch(setSearchTerm(localSearch));
  };

  const handleSearchChange = (e) => {
    setLocalSearch(e.target.value);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-left">
            <Link to="/" className="logo">
              <span className="logo-text">ShoppyGlobe</span>
            </Link>
          </div>
          
              <div className="header-center">
                <form className="search-form" onSubmit={handleSearchSubmit}>
                  <div className="search-container">
                    <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={localSearch}
                      onChange={handleSearchChange}
                      className="search-input"
                    />
                  </div>
                </form>
              </div>
          
          <div className="header-right">
            <Link to="/" className="nav-link">
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9,22 9,12 15,12 15,22"></polyline>
              </svg>
              <span className="nav-text">Home</span>
            </Link>
            <Link to="/cart" className="cart-link">
              <svg className="cart-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="m1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span className="cart-text">Cart{totalItems > 0 ? totalItems : '0'}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  // No props needed for this component
};

export default Header;
