import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart"
import { useWishlist } from "../context/WishlistContext";
import Profile from "../pages/Profile";




export default function Header() {
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

          <Link to="/profile" className="btn btn-outline-dark">
  <i className="bi bi-person"></i>
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
