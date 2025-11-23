import { createContext , useContext , useState } from "react";

const WishlistContext = createContext()



export function WishlistProvider({children}){
    const [wishlist , setWishlist] = useState([]);


    const AddToWishlist = (product) => {
        if(!wishlist.some((item) => item._id === product._id)){
            setWishlist([...wishlist , product])
             showAlert("Added to Wishlist ❤️");
        }
    }

    const RemoveWishlistItem = (id) => {
        setWishlist(wishlist.filter((item) => item._id !== id))
         showAlert("Removed from Wishlist 💔", "error");
    }

    return (
        <WishlistContext.Provider value={{wishlist , AddToWishlist , RemoveWishlistItem}}>
            {children}
        </WishlistContext.Provider>
    )
}
  export const useWishlist = () => useContext(WishlistContext)
