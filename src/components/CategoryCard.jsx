import React from 'react';
import PropTypes from 'prop-types';
import './CategoryCard.css';

const CategoryCard = ({ title, image, onClick }) => {
  return (
    <button className="category-card" onClick={onClick} aria-label={`View ${title}`}>
      <img src={image} alt={title} className="category-image" loading="lazy" />
      <div className="category-overlay">
        <div className="category-title">{title}</div>
        <div className="category-cta">Shop Now</div>
      </div>
    </button>
  );
};

CategoryCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
};

export default CategoryCard;


