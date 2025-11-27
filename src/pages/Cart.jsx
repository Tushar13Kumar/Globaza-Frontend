import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, increaseQty, decreaseQty, totalPrice , AddedInWishlist } = useCart();
  const { AddToWishlist } = useWishlist();

  // Calculate the total quantity of items (for display, not strictly required)
  const totalQuantity = cart.reduce((sum, item) => sum + item.qty, 0);

 return (
    <>
      <Header />
      <main className="container mt-4">
        <h1>Your Cart ({totalQuantity} Items)</h1>
        {cart.length === 0 && <p className="text-muted mt-3">Your cart is empty. Time to start shopping!</p>}
        <div className="row">
          {/* Left Column: Cart Items */}
          <div className="col-md-8">
            {cart.map((item) => (
              <div className="card mb-3 p-3 shadow-sm" key={item._id}>
                <div className="row align-items-lg-center">
                  <div className="col-3">
                    <img src={item.image} className="img-fluid rounded" alt={item.name} style={{ maxHeight: '150px', objectFit: 'cover' }} />
                  </div>
                  <div className="col-9 col-lg-6">
                    <h5>{item.name}</h5>
                    <p className="fw-bold mb-1">₹{item.price}</p>
                    <div className="d-flex align-items-center mb-3">
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQty(item._id)} disabled={item.qty === 1}>-</button>
                      <span className="mx-2 border px-3 py-1 rounded">{item.qty}</span>
                      <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQty(item._id)}>+</button>
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}><i className="bi bi-trash me-1"></i> Remove</button>
                      <button className="btn btn-outline-primary btn-sm ms-2" onClick={() => { AddToWishlist(item); AddedInWishlist(item._id); }}><i className="bi bi-heart me-1"></i> Move to Wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Price Details */}
          <div className="col-md-4">
            <div className="card p-3 shadow-sm sticky-top" style={{ top: '6rem' }}>
              <h5>Price Details</h5>
              <hr />

              {/* Price Breakdown for Individual Products (THE FIX) */}
              {cart.map((item) => (
                <div key={item._id + "summary"} className="d-flex justify-content-between mb-1">
                  <small className="text-muted">{item.name} ({item.qty} x ₹{item.price})</small>
                  <small className="fw-bold">₹{item.price * item.qty}</small>
                </div>
              ))}
              
              {/* Optional: Add Delivery Fee and Discount lines for better UX */}
              <div className="d-flex justify-content-between pt-2">
                  <p className="mb-0">Delivery Fee</p>
                  <p className="text-success mb-0 fw-bold">FREE</p>
              </div>

  <hr className="my-2" />
              
              {/* Final Total Price */}
              <div className="d-flex justify-content-between fw-bold fs-5">
                <span>Total Price</span>
                <span>₹ {totalPrice}</span>
              </div>

              <button 
                className="btn btn-success w-100 mt-4 py-2" 
                onClick={() => navigate("/checkout")}
                disabled={cart.length === 0}
              >
                <i className="bi bi-cart-check me-2"></i> Checkout ₹ {totalPrice}
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}