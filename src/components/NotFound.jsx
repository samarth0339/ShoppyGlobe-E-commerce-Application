import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const location = useLocation();
  
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="error-code">404</div>
        <h1>Page Not Found</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="error-details">
          The requested URL <code>{location.pathname}</code> was not found on this server. This could be because:
        </p>
        <ul className="error-reasons">
          <li>The page has been moved or deleted</li>
          <li>You entered an incorrect URL</li>
          <li>The link you followed is broken</li>
          <li>You don't have permission to access this page</li>
        </ul>
        
        <div className="error-actions">
          <Link to="/" className="home-btn">
            Go to Homepage
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="back-btn"
          >
            Go Back
          </button>
        </div>
        
        <div className="error-help">
          <p>Need help? Contact our support team or browse our products.</p>
          <Link to="/" className="browse-products">
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

NotFound.propTypes = {
  // No props needed
};

export default NotFound;
