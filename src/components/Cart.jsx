import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItems, selectCartTotalPrice } from '../store/slices/cartSlice';
import CartItem from './CartItem';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <h1 className="cart-title">My Cart</h1>
          <p className="cart-subtitle">Shopping Cart</p>
        </div>
        
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added anything to your cart yet</p>
          <Link to="/" className="continue-shopping-btn">
            <span className="btn-icon">🛍️</span>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1 className="cart-title">My Cart</h1>
        <p className="cart-subtitle">{totalItems} item{totalItems !== 1 ? 's' : ''} in your cart</p>
      </div>
      
      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items-header">
            <h2>Cart Items</h2>
            <span className="item-count">{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
          </div>
          
          <div className="cart-items">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>
        </div>
        
        <div className="cart-summary">
          <div className="summary-header">
            <h3>Price Details</h3>
          </div>
          
          <div className="summary-content">
            <div className="summary-row">
              <span>Price ({totalItems} item{totalItems !== 1 ? 's' : ''})</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Delivery Charges</span>
              <span className="free-delivery">FREE</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>Included</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total Amount</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="savings-info">
              <span className="savings-text">You will save ₹0 on this order</span>
            </div>
          </div>
          
          <div className="summary-actions">
            <Link to="/checkout" className="checkout-btn">
              <span className="btn-icon">💳</span>
              Place Order
            </Link>
            
            <Link to="/" className="continue-shopping-btn">
              <span className="btn-icon">🛍️</span>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Cart.propTypes = {
  // No props needed
};

export default Cart;
