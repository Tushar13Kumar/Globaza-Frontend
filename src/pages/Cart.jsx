import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, increaseQty, decreaseQty, totalPrice , AddedInWishlist } = useCart();
  const { AddToWishlist } = useWishlist();

  return (
    <>
      <Header />
      <main className="container mt-4">
        <h1>Your Cart</h1>
        {cart.length === 0 && <p>Your cart is empty</p>}
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => (
              <div className="card mb-3 p-3 shadow-sm" key={item._id}>
                <div className="row align-items-lg-center">
                  <div className="col-3">
                    <img src={item.image} className="img-fluid rounded" alt={item.name} />
                  </div>
                  <div className="col-6">
                    <h5>{item.name}</h5>
                    <p>₹{item.price}</p>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-light" onClick={() => decreaseQty(item._id)}>-</button>
                      <span className="mx-2">{item.qty}</span>
                      <button className="btn btn-light" onClick={() => increaseQty(item._id)}>+</button>
                    </div>
                    <div className="mt-3">
                      <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item._id)}>Remove</button>
                      <button className="btn btn-outline-primary btn-sm ms-2" onClick={() => { AddToWishlist(item); AddedInWishlist(item._id); }}>Move to Wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="col-md-4">
            <div className="card p-3 shadow-sm">
              <h5>Price Details</h5>
              <hr />
              <p>Total Price : ₹ {totalPrice}</p>
              <button className="btn btn-success w-100 mt-4" onClick={() => navigate("/checkout")}>Checkout ₹ {totalPrice}</button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
