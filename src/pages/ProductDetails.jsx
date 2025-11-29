import React, { useState } from "react"; // Import useState for size selection
import Header from "../components/Header";
import useFetch from "../useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
// import { useAlert } from "../context/AlertContext"; // Assuming you have an AlertContext
import { useToast } from "../context/ToastContext"; // <-- New Import!

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  // Using useFetch is generally discouraged for a single product. 
  // Ideally, you'd fetch only one product via /products/:id, but for this exercise, we keep your logic.
  const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products");
  const { cart, addToCart } = useCart();
  const { wishlist, AddToWishlist, RemoveWishlistItem } = useWishlist();
// const { showAlert } = useAlert();
const { showToast } = useToast(); // <-- New initialization!

  // --- UI State Management ---
  const [selectedSize, setSelectedSize] = useState("");
  // 1. --- CLEAN LOADING STATE CHECK ---
  if (loading) {
    return (
      <>
        <Header />
        <main className="container mt-5 mb-5 text-center">
          {/* Using Bootstrap spinner for a professional look */}
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="spinner-border text-primary me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="lead m-0">Loading product details...</p>
          </div>
        </main>
      </>
    );
  }
  
  // 2. --- ERROR STATE CHECK ---
  if (error) {
    return (
      <>
        <Header />
        <main className="container mt-5 mb-5 text-center">
          <p className="text-danger lead">
             <i className="bi bi-x-octagon-fill me-2"></i> Error fetching product details.
          </p>
        </main>
      </>
    );
  }

  const product = data?.find((item) => item._id === productId);
  if (!product) return <p className="text-center mt-4 text-muted">Product is not found</p>;

  const inCart = cart.some(item => item._id === product._id);
  const inWishlist = wishlist.some(i => i._id === product._id);
  const hasSizes = product.size && product.size.length > 0;

  // Function to handle Add to Cart logic
  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
        // Updated to use the new showToast from ToastContext
        showToast("Please select a size before adding to cart.", "warning");
        return;
    }

    // ... rest of the logic
    if (inCart) {
      navigate('/cart');
    } else {
      // addToCart will trigger its own toast, but you could add another if needed
      addToCart({ ...product, selectedSize: selectedSize || 'N/A' }); 
      // The toast below is redundant if addToCart already triggers one.
      // showToast(`${product.name} added to cart!`, "success");
    }
};

  return (
    <>
      <Header />
      <main className="container mt-5 mb-5">
        <div className="row g-4">
          
          {/* --- LEFT COLUMN: IMAGE AND ACTIONS --- */}
          <div className="col-md-5">
            <div className="card shadow-sm border-0 h-100">
              <div className="position-relative p-3">
                
                {/* Wishlist Button */}
                <button 
                  onClick={() => inWishlist ? RemoveWishlistItem(product._id) : AddToWishlist(product)}
                  className="btn position-absolute top-0 end-0 m-3 p-2 bg-white rounded-circle shadow-sm z-3"
                  aria-label="Toggle Wishlist"
                >
                  {inWishlist ? <i className="bi bi-heart-fill text-danger fs-5"></i> : <i className="bi bi-heart fs-5"></i>}
                </button>
                
                <img 
                  src={product.image || "https://via.placeholder.com/600x600.png?text=Product+Image"} 
                  alt={product.name} 
                  className="img-fluid rounded" 
                  style={{ maxHeight: '600px', width: '100%', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: DETAILS AND PURCHASE --- */}
          <div className="col-md-7">
            <div className="p-3">
              
              {/* Product Title and Rating */}
              <h1 className="fw-bolder">{product.name}</h1>
              <p className="text-muted text-uppercase mb-2">Category: {product.category?.name || 'N/A'}</p>
              <div className="d-flex align-items-center mb-4">
                <span className="badge bg-success me-2 fs-6">
                  {product.rating} <i className="bi bi-star-fill"></i>
                </span>
                <span className="text-secondary">({(Math.random() * 500 + 10).toFixed(0)} Reviews)</span>
              </div>
              <hr className="my-3"/>

              {/* Pricing Section */}
              <h2 className="mb-0">
                <span className="fw-bold text-success me-2">₹{product.price}</span>
                <span className="text-muted text-decoration-line-through me-2 fs-5">₹{product.originalPrice}</span>
                <span className="text-danger fw-bold fs-5">({product.discount}% OFF)</span>
              </h2>
              <p className="text-muted small">Inclusive of all taxes</p>
              <hr className="my-3"/>
              
              {/* Size Selection */}
              {hasSizes && (
                <div className="mb-4">
                  <h6 className="fw-bold">SELECT SIZE: <span className="text-danger">{selectedSize}</span></h6>
                  <div className="d-flex gap-2 flex-wrap">
                    {product.size.map((size) => (
                      <button 
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`btn btn-outline-dark ${selectedSize === size ? 'active border-3 border-dark' : ''}`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Action Buttons: Add to Cart & Buy Now */}
              <div className="d-grid gap-3 d-sm-flex mb-4">
                <button 
                  className={`btn btn-lg w-100 ${inCart ? 'btn-outline-primary' : 'btn-primary'}`} 
                  onClick={handleAddToCart}
                >
                  <i className={`bi bi-cart${inCart ? '-check' : ''} me-2`}></i>
                  {inCart ? "GO TO CART" : "ADD TO CART"}
                </button>
                <button className="btn btn-lg btn-warning w-100" onClick={() => navigate('/checkout')}>
                  <i className="bi bi-bag-check me-2"></i> BUY NOW
                </button>
              </div>

              {/* Product Description */}
              <div className="border p-3 rounded bg-light">
                <h6 className="fw-bold">PRODUCT DETAILS:</h6>
                <p className="mb-0">{product.description}</p>
              </div>

              {/* Stock Info */}
              <p className="mt-3 text-muted">
                <i className={`bi bi-${product.stock > 0 ? 'check-circle-fill text-success' : 'x-octagon-fill text-danger'} me-1`}></i>
                Stock: {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
              </p>

            </div>
          </div>
        </div>
      </main>
    </>
  );
}