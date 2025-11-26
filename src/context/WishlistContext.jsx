import { createContext, useContext, useState } from "react";
import { useAlert } from "./AlertContext";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const { showAlert } = useAlert();

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
