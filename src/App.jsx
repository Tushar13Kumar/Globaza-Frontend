import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import ProductListing from "./pages/ProductListing";
import Profile from "./pages/Profile";
import EditAddress from "./pages/EditAddress";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import User from "./pages/User";
import AddAddress from "./pages/AddAddress";

import AlertMessage from "./components/AlertMessage";

export default function App() {
  return (
    <Router>
      {/* ✅ Alert must be inside Router so it overlays all pages */}
      <AlertMessage />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productDetails/:productId" element={<ProductDetails />} />
        <Route path="/productListing/:categoryName" element={<ProductListing />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-address/:id" element={<EditAddress />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/user" element={<User />} />
        <Route path="/add-address" element={<AddAddress />} />
      </Routes>
    </Router>
  );
}
