import Header from "../components/Header";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, RemoveWishlistItem , AddedWishlistItemToCart } = useWishlist();
  const { cart, addToCart } = useCart();

  return (
    <>
      <Header />
      <main>
        <div className="container mt-4">
          <h3>Your Wishlist Products</h3>
          {wishlist.length === 0 && <p>No products in Wishlist</p>}
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {wishlist.map((item) => (
              <div className="col" key={item._id}>
                <div className="card shadow-sm">
                  <img src={item.image} alt={item.name} className="card-img-top" style={{ height: "180px", objectFit: "cover" }} />
                  <div className="card-body text-center">
                    <h6>{item.name}</h6>
                    <p>₹{item.price}</p>
                    <button className="btn btn-danger w-100 mb-2" onClick={() => RemoveWishlistItem(item._id)}>Remove</button>
                    <button className="btn btn-primary w-100" onClick={() => { addToCart(item); AddedWishlistItemToCart(item._id); }}>
                      {cart.some(c => c._id === item._id) ? "Go to Cart" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
