import { createContext , useContext , useState } from "react";
import { useAlert } from "./AlertContext";

const CartContext = createContext()


export function CartProvider({children}){
    
const { showAlert } = useAlert();
    const [cart , setCart] = useState([])

    const addToCart = (product) => {
        //add to cart 
       const exists = cart.find(item => item._id === product._id)

       if(exists){
        setCart(cart.map(item => item._id === product._id ? {...item , qty: item.qty+1} : item))
       }else{
        setCart([...cart , {...product , qty: 1}])
         showAlert("Added to Cart ✔");
       }
    }
    //remove from the cart 
    const removeFromCart = (id) => {
        setCart(cart.filter(item => item._id !== id))
        showAlert("Removed from Cart ❌", "error");
    }

    const increaseQty = (id) => {
        setCart(cart.map(item => item._id === id ? {...item , qty: item.qty+1}: item))
          showAlert("Increased quantity 🔼");
    }

    const decreaseQty = (id) => {
        setCart(cart.map(item => item._id === id && item.qty > 1 ?  {...item , qty: item.qty-1}: item))
        showAlert("Decreased quantity 🔽");
    }

    // (only show the changed parts)
const clearCart = () => {
  setCart([]);
}

    const totalPrice = cart.reduce((sum , item) => sum + item.price * item.qty , 0)

    return(
        <CartContext.Provider value={{cart , addToCart , removeFromCart , increaseQty , decreaseQty , clearCart , totalPrice}}>
            {children}
        </CartContext.Provider>
    )

}

export const useCart = () => useContext(CartContext)