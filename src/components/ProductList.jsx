import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectSearchTerm, setSearchTerm } from '../store/slices/searchSlice';
import useProducts from '../hooks/useProducts';
import ProductItem from './ProductItem';
import './ProductList.css';

const ProductList = () => {
  const { products, loading, error } = useProducts();
  const searchTerm = useSelector(selectSearchTerm);
  const dispatch = useDispatch();
  
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: 0,
    maxPrice: 10000,
    sortBy: 'default'
  });

  // Get categories from products
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(p => p.category))];
    return uniqueCategories.map(cat => ({
      value: cat,
      label: cat.charAt(0).toUpperCase() + cat.slice(1)
    }));
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Search filter
    const activeSearch = (searchTerm && searchTerm.trim()) ? searchTerm : filters.search;
    if (activeSearch) {
      const q = activeSearch.toLowerCase();
      filtered = filtered.filter(product =>
        (product.title || '').toLowerCase().includes(q) ||
        (product.description || '').toLowerCase().includes(q) ||
        (product.category || '').toLowerCase().includes(q)
      );
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Sort products
    switch (filters.sortBy) {
      case 'price-low':
        filtered = [...filtered].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered = [...filtered].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Keep original order
        break;
    }

    return filtered;
  }, [products, filters, searchTerm]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    if (key === 'search') {
      dispatch(setSearchTerm(value));
    }
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      category: '',
      minPrice: 0,
      maxPrice: 10000,
      sortBy: 'default'
    });
    dispatch(setSearchTerm(''));
  };

  if (loading) {
    return (
      <div className="product-list-container">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-list-container">
        <div className="error">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="product-list-container">
      <div className="main-layout">
        {/* Left Sidebar - Filters */}
        <div className="filters-sidebar">
          <div className="filters-header">
            <h3>Filters</h3>
            <button className="clear-filters-btn" onClick={clearAllFilters}>
              <span>✕</span> Clear All Filters
            </button>
          </div>

          <div className="filter-section">
            <label className="filter-label">Search Products</label>
            <input
              type="text"
              placeholder="Search by name, description..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="filter-input"
            />
          </div>

          <div className="filter-section">
            <label className="filter-label">Category</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="filter-select"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

              <div className="filter-section">
                <label className="filter-label">Price Range: ${filters.minPrice} - ${filters.maxPrice}</label>
                <div className="price-range">
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    value={filters.maxPrice}
                    onChange={(e) => handleFilterChange('maxPrice', parseInt(e.target.value))}
                    className="price-slider"
                  />
                </div>
              </div>

          <div className="filter-section">
            <label className="filter-label">Sort By</label>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="filter-select"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
              <option value="name">Name</option>
            </select>
          </div>
        </div>

        {/* Right Section - Products */}
        <div className="products-section">
          <div className="products-header">
            <h2>Our Products</h2>
            <span className="product-count">({filteredProducts.length} products)</span>
          </div>
          
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductItem key={product.id} product={product} />
              ))
            ) : (
              <div className="no-products">
                <div className="no-products-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your filters or search terms</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ProductList.propTypes = {
  // No props needed
};

export default ProductList;
