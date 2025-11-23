import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart"
import { useWishlist } from "../context/WishlistContext";
import Profile from "../pages/Profile";
import { useState } from "react";
import useFetch from "../useFetch";




export default function Header({ onSearch }) {
   const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products");
   const [searchQuery, setSearchQuery] = useState("");
   
  // Apply filters and search
  const filteredEvents = data?.filter((event) => {
    
    const query = searchQuery.toLowerCase();
    const searchMatch =
      event.name.toLowerCase().includes(query)
      
    return  searchMatch;
  });
 

  return (
    <header className="shadow-sm bg-white py-4">
      {/* Top Navbar */}
      <div className="navbar navbar-expand-lg px-4 py-4 align-items-center">
        {/* Brand */}
        <Link to="/" className="navbar-brand fw-bold py-4 text-primary">
          Globlaza
        </Link>

        {/* Search Bar */}
        <form className="d-flex mx-auto" style={{ width: "50%" }}>
          <input
            type="search"
            className="form-control me-2"
            placeholder="Search products..."
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit">
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* Right Buttons */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-outline-secondary">Login</button>

          <Link to="/wishlist" className="btn btn-outline-danger">
            <i className="bi bi-heart"></i>
          </Link>

          <Link to="/cart" className="btn btn-outline-success">
            <i className="bi bi-cart">Cart</i>
          </Link>

          <Link to="/user" className="btn btn-outline-dark">
  <i className="bi bi-person"></i>
</Link>

            <Link to="/Profile" className="btn btn-outline-dark">
  <i className="bi bi-pencil"></i>
</Link>

        </div>
      </div>

      {/* Category Navbar */}
      {/* <nav className="d-flex justify-content-center gap-4 py-2 border-top bg-light">
        <button className="btn btn-light text-secondary fw-semibold">Men</button>
        <button className="btn btn-light text-secondary fw-semibold">Women</button>
        <button className="btn btn-light text-secondary fw-semibold">Kids</button>
        <button className="btn btn-light text-secondary fw-semibold">Electronics</button>
        <button className="btn btn-light text-secondary fw-semibold">Home</button>
      </nav> */}
    </header>
  );
}
