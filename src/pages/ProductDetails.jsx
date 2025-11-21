import Header from "../components/Header"
import useFetch from "../useFetch"
import { useParams } from "react-router-dom"
import { useState } from "react"
import { useCart } from "../context/CartContext"

export default function ProductDetails(){
    const {productId} = useParams()
    const {cart , addToCart} = useCart();

    const  { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products")
    const [cartItemsButton , setCartItemsButton] = useState([])
    const [wishListItemsIcon , setWishListItemsIcon] = useState([])
    if(loading)return(  <p>Loading....</p> )
        if(error)return(  <p>Error...</p> )

            const product = data?.find((item) =>item._id === productId)

    console.log(product)

    if(!product) {
        return(
            <p className="text-center mt-4">Product is not found</p>
        )
    }

    const handleCartItems =(id) => {
     if(cartItemsButton.includes(id)){
        setCartItemsButton(cartItemsButton.filter((item) => item !== id))

     }else{
        setCartItemsButton([...cartItemsButton , id])
     }
    }

    const handleWishList = (id) => {
        if(wishListItemsIcon.includes(id) ){
            setWishListItemsIcon(wishListItemsIcon.filter((item) => item !== id))
        }else{
            setWishListItemsIcon([...wishListItemsIcon , id])
        }
    }


    return(
        <>
        <Header/>
        <main className="container mt-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="position-relative">
                    <button onClick={() => handleWishList(product._id)} className="btn position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm"> {wishListItemsIcon.includes(product._id)? <i className="bi bi-heart-fill text-danger"></i>:<i className="bi bi-heart"></i> }
</button>
                    <img src={product.image} alt={product.name} className="img-fluid rounded" />
                  </div>
                   <button className="btn btn-primary mt-3 " onClick={() => addToCart(product)}>{cart.some(item => item._id === product._id)? "Go to Cart" : "Add to Cart"}</button>
                    
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <h4>⭐ {product.rating}</h4>
                    <p className="text-primary">Price: {product.price}</p> <p className="text-secondary">Original Price:{product.originalPrice}</p>
                    <p>Discount: {product.discount}</p>
                    <p>Size available: {product.size}</p>
                    <hr />
                    <p>{product.description}</p>
                </div>
            </div>
        </main>
        </>
    )
}