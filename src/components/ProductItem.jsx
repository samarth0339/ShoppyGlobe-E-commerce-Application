import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <div className="product-image-container">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="product-image"
          loading="lazy"
        />
        {product.discountPercentage && (
          <div className="product-discount">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-description">
          {product.description.length > 80 
            ? `${product.description.substring(0, 80)}...` 
            : product.description
          }
        </p>
        
        <div className="product-rating-stock">
          <div className="product-rating">
            <span className="rating-star">⭐</span>
            <span className="rating-value">{product.rating}</span>
          </div>
          <div className="product-stock">
            ({product.stock || 0} in stock)
          </div>
        </div>
        
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.discountPercentage && (
            <span className="original-price">
              ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
        
        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
          <span className="cart-icon">🛒</span>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    discountPercentage: PropTypes.number,
    rating: PropTypes.number.isRequired,
    stock: PropTypes.number,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default ProductItem;
