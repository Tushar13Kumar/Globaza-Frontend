import Header from "../components/Header"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import { useNavigate } from "react-router-dom";
import { useAlert } from "../context/AlertContext";


export default function Cart(){
     const navigate = useNavigate();
     const { showAlert } = useAlert();

    const {cart , addToCart , removeFromCart , increaseQty , decreaseQty , totalPrice} = useCart()
    const {wishlist , AddToWishlist , RemoveWishlistItem} = useWishlist()
    return(
        <>
        <Header />
        <main className="container mt-4">
         <h1>Your Cart</h1>
         {cart.length === 0 && <p>Cart have not any product</p> }
         <div className="row">
            <div className="col-md-8">
                {cart.map((item) => (
                    <div className="card mb-3 p-3 shadow-sm" key={item._id}>
                        <div className="row align-items-lg-center">
                            <div className="col-3">
                                <img src={item.image} className="img-fluid rounded" alt={item.name} />
                            </div>
                            <div className="col=-6">
                                <h5>{item.name}</h5>
                                <p>Rs{item.price}</p>
                                <div className="d-flex align-items-lg-center">
                                    <button onClick={()=> decreaseQty(item._id)}>-</button>
                                    <span className="mx-2">{item.qty}</span>
                                    <button onClick={() => increaseQty(item._id)}>+</button>
                                </div>
                                <button className="btn btn-danger btn-sm mt-3" onClick={() => removeFromCart(item._id)}>Remove</button>
                              <button className="btn btn-outline-primary btn-sm mt-3 ms-3" onClick={() => AddToWishlist(item._id)}>Move to Wishlist</button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* //price details  */}
            <div className="col-md-4">
                <div className="card p-3 shadow-sm">
                    <h5>Price Details</h5>
                    <hr />
                    <p>Total Price : Rs {totalPrice}</p>
                    <button className="btn btn-success w-100 mt-4" onClick={() => navigate("/checkout")}>Checkout Rs {totalPrice}</button>
                </div>
            </div>

         </div>
        </main>
        </>
    )
}