import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import './CartItem.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.id));
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  const handleIncrement = () => {
    handleQuantityChange(item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      handleQuantityChange(item.quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.thumbnail} alt={item.title} loading="lazy" />
      </div>
      
      <div className="item-details">
        <h3 className="item-title">{item.title}</h3>
        <p className="item-category">{item.category}</p>
        <div className="item-price-section">
          <span className="item-price">${item.price}</span>
          {item.discountPercentage && (
            <span className="item-original-price">
              ${(item.price / (1 - item.discountPercentage / 100)).toFixed(2)}
            </span>
          )}
        </div>
        <div className="item-rating">
          <span className="rating-stars">
            {'★'.repeat(Math.round(item.rating || 0))}
            {'☆'.repeat(5 - Math.round(item.rating || 0))}
          </span>
          <span className="rating-value">({item.rating || 0})</span>
        </div>
      </div>
      
      <div className="quantity-section">
        <div className="quantity-controls">
          <button 
            className="quantity-btn decrement"
            onClick={handleDecrement}
            disabled={item.quantity <= 1}
            title="Decrease quantity"
          >
            −
          </button>
          <span className="quantity">{item.quantity}</span>
          <button 
            className="quantity-btn increment"
            onClick={handleIncrement}
            title="Increase quantity"
          >
            +
          </button>
        </div>
        <button 
          className="remove-btn"
          onClick={handleRemoveItem}
          title="Remove item"
        >
          <span className="remove-icon">🗑️</span>
          <span className="remove-text">Remove</span>
        </button>
      </div>
      
      <div className="item-total">
        <span className="total-label">Total</span>
        <span className="total-price">${(item.price * item.quantity).toFixed(2)}</span>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired
};

export default CartItem;
