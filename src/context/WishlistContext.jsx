import { createContext, useContext, useState, useEffect } from "react"; // 👈 Import useEffect
import { useAlert } from "./AlertContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  // 1. Initialize state from localStorage (or [])
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("globlaza_wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  const { showAlert } = useAlert();

  // 2. Save wishlist to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem("globlaza_wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const AddToWishlist = (product) => {
    if (!wishlist.some((item) => item._id === product._id)) {
      setWishlist([...wishlist, product]);
      showAlert("Added to Wishlist ❤️");
    } else {
      showAlert("Already in Wishlist", "error");
    }
  };

  const RemoveWishlistItem = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
    showAlert("Removed from Wishlist 💔", "error");
  };

  const AddedWishlistItemToCart = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
    showAlert("Move an item from wishlist to cart ✔", "error");
  };

  return (
    <WishlistContext.Provider value={{ wishlist, AddToWishlist, RemoveWishlistItem  , AddedWishlistItemToCart}}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
