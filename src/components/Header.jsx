import React from "react";
import { Link, useNavigate } from "react-router-dom"; // 👈 Import useNavigate
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useSearch } from "../context/SearchContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const navigate = useNavigate(); // 👈 Initialize useNavigate
  const { searchQuery, setSearchQuery } = useSearch();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    // If the user is not already on the ProductListing page, navigate them there.
    // We navigate to a generic category (e.g., 'all') to ensure the PL page loads.
    // The actual filtering will be done by the searchQuery from the context.
    navigate("/productListing/all"); // 👈 Redirect on search
  };

  return (
    <header className="shadow-sm bg-white py-3">
      <div className="navbar navbar-expand-lg px-4 align-items-center">
        <Link to="/" className="navbar-brand fw-bold text-primary">Globlaza</Link>

        {/* Change onSubmit to call the new handleSearch function */}
        <form className="d-flex mx-auto" style={{ width: "50%" }} onSubmit={handleSearch}> 
          <input
            type="text"
            className="form-control"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Remove onClick={e => e.preventDefault()} and let the form handle submit */}
          <button className="btn btn-outline-primary" type="submit"> 
            <i className="bi bi-search"></i>
          </button>
        </form>

        <div className="d-flex align-items-center gap-2">
          {/* ... rest of the links remain the same ... */}
          <Link to="/wishlist" className="btn btn-outline-danger position-relative">
            <i className="bi bi-heart"></i>
            {wishlist.length > 0 && <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">{wishlist.length}</span>}
          </Link>

          <Link to="/cart" className="btn btn-outline-success position-relative">
            <i className="bi bi-cart"></i>
            {cart.length > 0 && <span className="badge bg-success position-absolute top-0 start-100 translate-middle">{cart.length}</span>}
          </Link>

          <Link to="/profile" className="btn btn-outline-dark">
            <i className="bi bi-pencil"></i>
          </Link>

           <Link to="/user" className="btn btn-outline-dark">
            <i className="bi bi-person"></i>
          </Link>        
        </div>
      </div>
    </header>
  );
}