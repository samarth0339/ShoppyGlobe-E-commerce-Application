import React, { Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Header from './components/Header';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

// Lazy load components
const ProductList = React.lazy(() => import('./components/ProductList'));
const ProductDetail = React.lazy(() => import('./components/ProductDetail'));
const Cart = React.lazy(() => import('./components/Cart'));
const Checkout = React.lazy(() => import('./components/Checkout'));
const NotFound = React.lazy(() => import('./components/NotFound'));

const LoadingSpinner = () => (
  <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading...</p>
  </div>
);

const Layout = () => (
  <div className="app">
    <Header />
    <main className="main-content">
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </main>
  </div>
);

const ErrorFallback = () => (
  <div className="error-boundary">
    <div className="error-boundary-content">
      <div className="error-icon">⚠️</div>
      <h2>Something went wrong</h2>
      <p>We're sorry, but something unexpected happened. Please try refreshing the page.</p>
      <div className="error-actions">
        <button 
          onClick={() => window.location.reload()} 
          className="retry-btn"
        >
          Refresh Page
        </button>
        <button 
          onClick={() => window.history.back()} 
          className="back-btn"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorFallback />,
    children: [
      {
        index: true,
        element: <ProductList />,
        errorElement: <ErrorFallback />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
        errorElement: <ErrorFallback />,
      },
      {
        path: 'cart',
        element: <Cart />,
        errorElement: <ErrorFallback />,
      },
      {
        path: 'checkout',
        element: <Checkout />,
        errorElement: <ErrorFallback />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
