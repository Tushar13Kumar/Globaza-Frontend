import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSearch } from "../context/SearchContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useSearch();
  const { wishlist } = useWishlist();
  const { cart } = useCart();
  const [showOffcanvas, setShowOffcanvas] = useState(false); 

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/productListing/all");
  };

  const closeOffcanvas = () => setShowOffcanvas(false);

  // --- Utility Component for Reusable Icon Links ---
  const IconLinks = ({ onClick }) => (
    <>
      <Link to="/wishlist" className="btn btn-outline-danger position-relative" onClick={onClick}>
        <i className="bi bi-heart me-1"></i> Wishlist
        {wishlist.length > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{wishlist.length}</span>}
      </Link>

      <Link to="/cart" className="btn btn-outline-success position-relative" onClick={onClick}>
        <i className="bi bi-cart me-1"></i> Cart
        {cart.length > 0 && <span className="badge bg-success position-absolute top-0 start-100 translate-middle">{cart.length}</span>}
      </Link>

      <Link to="/profile" className="btn btn-outline-dark" onClick={onClick}>
        <i className="bi bi-pencil me-1"></i> Edit Profile
      </Link>

      <Link to="/user" className="btn btn-outline-dark" onClick={onClick}>
        <i className="bi bi-person me-1"></i> My Account
      </Link>
    </>
  );

  return (
    <header className="shadow-sm bg-white py-3 sticky-top">
      {/* --- ROW 1: BRAND NAME, DESKTOP SEARCH, DESKTOP ICONS / MOBILE TOGGLE --- */}
      <div className="navbar navbar-expand-lg px-4 align-items-center">
        
        {/* 1. Brand Name */}
        <Link to="/" className="navbar-brand fw-bold text-primary fs-4">Globlaza</Link>
        
        {/* 2. DESKTOP Search Form (Hidden on small screens, shown on large) */}
        <form className="d-none d-lg-flex mx-auto" style={{ width: "50%" }} onSubmit={handleSearch}> 
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-primary" type="submit"> 
            <i className="bi bi-search"></i>
          </button>
        </form>

        {/* 3. Desktop Icons */}
        <div className="d-none d-lg-flex align-items-center gap-2">
            <IconLinks />
        </div>
        
        {/* 4. Mobile Menu Toggle (Only need the toggle button here now) */}
        <div className="d-flex d-lg-none align-items-center gap-2 ms-auto">
            <button 
                className="btn btn-outline-dark" 
                type="button" 
                onClick={() => setShowOffcanvas(true)} 
                aria-controls="mobile-offcanvas"
            >
                <i className="bi bi-list"></i>
            </button>
        </div>
      </div>

      {/* --- NEW ROW 2: MOBILE SEARCH BAR (Visible only on small screens) --- */}
      {/* Added py-2 for vertical padding */}
      <div className="d-lg-none px-4 py-2">
        <form className="d-flex w-100" onSubmit={handleSearch}> 
            <input
              type="text"
              className="form-control"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary" type="submit"> 
              <i className="bi bi-search"></i>
            </button>
        </form>
      </div>

      {/* --- 5. Offcanvas Menu Structure (Mobile Navigation) --- */}
      <div 
        className={`offcanvas offcanvas-end${showOffcanvas ? ' show' : ''}`} 
        tabIndex="-1" 
        id="mobile-offcanvas" 
        aria-labelledby="offcanvasLabel"
        style={{ visibility: showOffcanvas ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title fw-bold text-primary" id="offcanvasLabel">Navigation</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={closeOffcanvas} 
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body d-flex flex-column gap-3">
          
          {/* ICON LINKS are now the main content of the Offcanvas body */}
          <IconLinks onClick={closeOffcanvas} />
          
        </div>
      </div>
      
      {/* Add an overlay when the offcanvas is open */}
      {showOffcanvas && (
          <div className="offcanvas-backdrop fade show" onClick={closeOffcanvas}></div>
      )}
    </header>
  );
}