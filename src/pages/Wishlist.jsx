import { useContext } from "react"
import Header from "../components/Header"
import { useWishlist } from "../context/WishlistContext"
import { Link } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/CartContext"
export default function Wishlist(){
    const { wishlist , RemoveWishlistItem } = useWishlist();
    const {cart , addToCart , removeFromCart , increaseQty , decreaseQty , totalPrice} = useCart()
      const [cartItems , setCartItems] = useState([])
      const handleAddToCart = (id) => {
    if(cartItems.includes(id)){
      setCartItems(cartItems.filter((items) => items !== id))
    }else{
      setCartItems([...cartItems , id])


    }
  }
    
    return(
        <>
          <Header/>
            <main>
                <div className="container mt-4">
                    <h3>Your Wishlist Products</h3>
                    {Wishlist.length === 0 && <p>No products in Wishlist</p> }
                    <div className="row row-cols-1 row-cols-4 g-4">

                        {wishlist.map((item) => (
                            <div className="col" key={item.id}>
                                <div className="card shadow-sm">
                                    <img src={item.image} alt=""  className="card-image-top"/>
                                    <div className="card-body text-center">
                                        <h6>{item.name}</h6>
                                        <p>Rs{item.price}</p>
                                        <button className="btn btn-danger w-100" onClick={() => RemoveWishlistItem(item._id)}>Remove</button>
                                        <button onClick={() => addToCart(item)}>{cart.some(items => items._id === item._id ) ? "Go to Cart": "Add to Cart"}</button>

                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>


        </main>
        </>
    )
}