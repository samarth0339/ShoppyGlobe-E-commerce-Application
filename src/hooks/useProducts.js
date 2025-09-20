import { useState, useEffect, useRef } from 'react';

// Fetch products from API
const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Cancel request if component unmounts
        abortControllerRef.current = new AbortController();
        const signal = abortControllerRef.current.signal;
        
        const response = await fetch('https://dummyjson.com/products', {
          signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        // Handle response errors
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        
        const result = await response.json();
        
        // Check if data is valid
        if (!result || typeof result !== 'object') {
          throw new Error('Invalid response format from server');
        }
        
        setProducts(result.products || []);
      } catch (err) {
        // Handle errors
        if (err.name === 'AbortError') {
          console.log('Request was cancelled');
          return;
        }
        
        const errorMessage = err.message || 'Failed to load products. Please try again later.';
        setError(errorMessage);
        console.error('Failed to load products:', err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();

    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return { products, loading, error };
};

export default useProducts;
