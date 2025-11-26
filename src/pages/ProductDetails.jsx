import Header from "../components/Header";
import useFetch from "../useFetch";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products");
  const { cart, addToCart } = useCart();
  const { wishlist, AddToWishlist, RemoveWishlistItem } = useWishlist();

  if (loading) return <p>Loading....</p>;
  if (error) return <p>Error...</p>;

  const product = data?.find((item) => item._id === productId);
  if (!product) return <p className="text-center mt-4">Product is not found</p>;

  const inWishlist = wishlist.some(i => i._id === product._id);

  return (
    <>
      <Header />
      <main className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="position-relative">
              <button onClick={() => inWishlist ? RemoveWishlistItem(product._id) : AddToWishlist(product)}
                className="btn position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm">
                {inWishlist ? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart"></i>}
              </button>
              <img src={product.image} alt={product.name} className="img-fluid rounded" />
               <div className="mt-3">
              <button className="btn btn-primary" onClick={() => addToCart(product)}>
                {cart.some(item => item._id === product._id) ? "Go to Cart" : "Add to Cart"}
              </button>
            </div>
            </div>
           
          </div>

          <div className="col-md-6">
            <h2>{product.name}</h2>
            <h4>⭐ {product.rating}</h4>
            <p className="text-primary">Price: ₹{product.price}</p>
            <p className="text-secondary">Original Price: ₹{product.originalPrice}</p>
            <p>Discount: {product.discount}</p>
            <p>Size available: {product.size}</p>
            <hr />
            <p>{product.description}</p>
          </div>
        </div>
      </main>
    </>
  );
}
