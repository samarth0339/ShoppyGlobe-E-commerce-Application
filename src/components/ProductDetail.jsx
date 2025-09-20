import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  // Image selection state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Cancel request if component unmounts
        const abortController = new AbortController();
        const signal = abortController.signal;
        
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
          signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Handle response errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if data is valid
        if (!data || typeof data !== 'object') {
          throw new Error('Invalid response format from server');
        }
        
        // Verify product exists
        if (!data.id) {
          throw new Error('Product not found');
        }
        
        setProduct(data);
      } catch (err) {
        // Handle errors
        if (err.name === 'AbortError') {
          console.log('Request was cancelled');
          return;
        }
        
        const errorMessage = err.message || 'Failed to load product details. Please try again later.';
        setError(errorMessage);
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  // Add to cart
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  // Go back
  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="product-detail-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <h2>Error loading product</h2>
          <p>{error}</p>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-detail-container">
        <div className="error">
          <h2>Product not found</h2>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={handleGoBack}>
        ← Back to Products
      </button>
      
      <div className="product-detail">
        <div className="product-images">
          <div className="main-image">
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              loading="lazy"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="thumbnail-images">
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => setSelectedImage(index)}
                  loading="lazy"
                />
              ))}
            </div>
          )}
        </div>
        
        <div className="product-details">
          <h1 className="product-title">{product.title}</h1>
          <p className="product-category">{product.category}</p>
          <p className="product-brand">Brand: {product.brand}</p>
          
          <div className="product-rating">
            <span className="rating-stars">
              {'★'.repeat(Math.round(product.rating))}
              {'☆'.repeat(5 - Math.round(product.rating))}
            </span>
            <span className="rating-value">({product.rating})</span>
            <span className="rating-count">({Array.isArray(product.reviews) ? product.reviews.length : product.reviews || 0} reviews)</span>
          </div>
          
          <p className="product-description">{product.description}</p>
          
          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.discountPercentage && (
              <>
                <span className="original-price">
                  ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="discount-percentage">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              </>
            )}
          </div>
          
          <div className="product-stock">
            <span className={`stock-status ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
            </span>
          </div>
          
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
};

ProductDetail.propTypes = {
  // No props needed
};

export default ProductDetail;
