import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";


import './index.css'
import App from './App.jsx'

import { WishlistProvider } from './context/WishlistContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { AddressProvider } from './context/AddressContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WishlistProvider>
      <CartProvider>
        <AddressProvider>
    <App />
    </AddressProvider>
    </CartProvider>
    </WishlistProvider>
  </StrictMode>,
)
