import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import React from 'react';
import ReactDOM from 'react-dom/client';


import './index.css'
import App from './App.jsx'

import { ToastProvider } from './context/ToastContext.jsx'; // NEW
import { WishlistProvider } from './context/WishlistContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AddressProvider } from './context/AddressContext.jsx';
import { OrderProvider } from './context/OrderContext.jsx';
// import { AlertProvider } from './context/AlertContext.jsx';
import { SearchProvider } from './context/SearchContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SearchProvider>
    <ToastProvider>
    <WishlistProvider>
      <CartProvider>
        <AddressProvider>
           <OrderProvider>
    <App />
    </OrderProvider>
    </AddressProvider>
    </CartProvider>
    </WishlistProvider>
    </ToastProvider>
    </SearchProvider>
  </StrictMode>,
)
