import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext"; // 👈 CHANGE: Import useToast

const CartContext = createContext();

export function CartProvider({ children }) {
  // 1. CHANGE: Use useToast instead of useAlert
  const { showToast } = useToast(); 
  
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("globlaza_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("globlaza_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const exists = cart.find((item) => item._id === product._id);
    if (exists) {
      setCart(cart.map((item) => item._id === product._id ? { ...item, qty: item.qty + 1 } : item));
      showToast(`Increased quantity for ${product.name} 🔼`, "info"); // 👈 TOAST
    } else {
      setCart([...cart, { ...product, qty: 1 }]);
      showToast(`${product.name} added to Cart ✔`, "success"); // 👈 TOAST
    }
  };

  const removeFromCart = (id) => {
    const product = cart.find((item) => item._id === id); // Get product name for toast
    setCart(cart.filter((item) => item._id !== id));
    showToast(`${product.name} removed from Cart ❌`, "error"); // 👈 TOAST
  };
  
  // Logic for moving an item from Cart to Wishlist
  const AddedInWishlist = (id) => {
    const product = cart.find((item) => item._id === id); // Get product name for toast
    setCart(cart.filter((item) => item._id !== id));
    showToast(`Moved ${product.name} to Wishlist ❤️`, "info"); // 👈 TOAST
  };

  const increaseQty = (id) => {
    const product = cart.find((item) => item._id === id);
    setCart(cart.map((item) => item._id === id ? { ...item, qty: item.qty + 1 } : item));
    showToast(`Increased ${product.name} to ${product.qty + 1} ⬆️`, "info"); // 👈 TOAST
  };

  const decreaseQty = (id) => {
    const product = cart.find((item) => item._id === id);
    if (product.qty > 1) {
        setCart(cart.map((item) =>
          item._id === id ? { ...item, qty: item.qty - 1 } : item
        ));
        showToast(`Decreased ${product.name} to ${product.qty - 1} ⬇️`, "warning"); // 👈 TOAST
    }
    // No toast if qty is already 1, as button is disabled in UI
  };


  const toggleCart = (product) => {
  const exists = cart.some((item) => item._id === product._id);

  if (exists) {
    // If already in cart → remove it
    setCart(cart.filter((item) => item._id !== product._id));
    showToast(`${product.name} removed from cart ❌`, "error"); // 👈 TOAST
  } else {
    // If not in cart → add it
    setCart([...cart, { ...product, qty: 1 }]);
    showToast(`${product.name} added to cart ✔`, "success"); // 👈 TOAST
  }
};

  const clearCart = () => {
    setCart([]);
    // showToast("Cart cleared!", "error"); // 👈 TOAST
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, AddedInWishlist , totalPrice  , toggleCart}}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);