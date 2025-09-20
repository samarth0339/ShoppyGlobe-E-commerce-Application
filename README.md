# ShoppyGlobe E-commerce Application

A modern, responsive e-commerce application built with React, Vite, Redux Toolkit, and React Router. This project demonstrates a complete e-commerce shopping experience with product browsing, cart management, and checkout functionality.


## Repository

**GitHub Repository:** [https://github.com/samarth0339/ShoppyGlobe-E-commerce-Application.git](https://github.com/samarth0339/ShoppyGlobe-E-commerce-Application.git)

## Project Structure
```
src/
├── components/          # React components
│   ├── Header.jsx      # Navigation header with search
│   ├── ProductList.jsx # Product listing with filters
│   ├── ProductItem.jsx # Individual product card
│   ├── ProductDetail.jsx # Product detail page
│   ├── Cart.jsx        # Shopping cart page
│   ├── CartItem.jsx    # Individual cart item
│   ├── Checkout.jsx    # Checkout form
│   └── NotFound.jsx    # 404 error page
├── store/              # Redux store configuration
│   ├── store.js        # Store setup
│   └── slices/         # Redux slices
│       ├── cartSlice.js    # Cart state management
│       └── searchSlice.js  # Search state management
├── hooks/              # Custom React hooks
│   └── useProducts.js      # Product data fetching
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```