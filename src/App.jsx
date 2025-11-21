import React from "react";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Profile from "./pages/Profile";
import EditAddress from "./pages/EditAddress";
import Checkout from "./pages/Checkout";



export default function App() {
  return (
    <>
    <Router>
      <main>
 <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        {/* //<Route path="/productListing" element={<ProductListing/>} /> */}
        <Route path="/productDetails/:productId" element={<ProductDetails/>} />
        <Route path="/productListing/:productId" element={<ProductListing/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/edit-address/:id" element={<EditAddress />} />


      </Routes>
      </main>
    </Router>
     
    </>
  );
}
