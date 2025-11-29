import { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "./ToastContext"; // 👈 CHANGE: Import useToast

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // 1. CHANGE: Use useToast instead of useAlert
  const { showToast } = useToast();

  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("globlaza_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  useEffect(() => {
    localStorage.setItem("globlaza_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const AddToWishlist = (product) => {
    if (!wishlist.some((item) => item._id === product._id)) {
      setWishlist([...wishlist, product]);
      showToast(`${product.name} added to Wishlist ❤️`, "success"); // 👈 TOAST
    } else {
      showToast(`${product.name} is already in Wishlist`, "warning"); // 👈 TOAST
    }
  };

  const RemoveWishlistItem = (id) => {
    const itemToRemove = wishlist.find((item) => item._id === id); // Get product name
    setWishlist(wishlist.filter((item) => item._id !== id));
    showToast(`${itemToRemove.name} removed from Wishlist 💔`, "error"); // 👈 TOAST
  };

  // Logic for moving an item from Wishlist to Cart
  const AddedWishlistItemToCart = (id) => {
    const product = wishlist.find((item) => item._id === id); // Get product name
    setWishlist(wishlist.filter((item) => item._id !== id));
    showToast(`Moved ${product.name} to Cart 🛒`, "info"); // 👈 TOAST
  };

  return (
    <WishlistContext.Provider value={{ wishlist, AddToWishlist, RemoveWishlistItem  , AddedWishlistItemToCart}}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);