import { createContext, useContext, useState, useEffect } from "react"; // 👈 Import useEffect
import { useAlert } from "./AlertContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { showAlert } = useAlert();
  
  // 1. Initialize state from localStorage (or [])
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("globlaza_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 2. Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("globlaza_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      setCart(cart.map((item) => item._id === product._id ? { ...item, qty: item.qty + 1 } : item));
      showAlert("Increased quantity 🔼");
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      showAlert("Added to Cart ✔");
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    showAlert("Removed from Cart ❌", "error");
  };
  const AddedInWishlist = (id) => {
    setCart(cart.filter((item) => item._id !== id));
    showAlert("Move an item from the cart to the wishlist ✔ ", "error");
  };

  const increaseQty = (id) => {
    setCart(cart.map((item) => item._id === id ? { ...item, qty: item.qty + 1 } : item));
    showAlert("Increased quantity 🔼");
  };

  const decreaseQty = (id) => {
    setCart(cart.map((item) =>
      item._id === id ? { ...item, qty: Math.max(1, item.qty - 1) } : item
    ));
    showAlert("Decreased quantity 🔽");
  };


  const toggleCart = (product) => {
  const exists = cart.some((item) => item._id === product._id);

  if (exists) {
    // If already in cart → remove it
    setCart(cart.filter((item) => item._id !== product._id));
    showAlert("Removed from cart ✔");
  } else {
    // If not in cart → add it
    setCart([...cart, { ...product, qty: 1 }]);
    showAlert("Added to cart ✔");
  }
};

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, AddedInWishlist , totalPrice  , toggleCart}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
