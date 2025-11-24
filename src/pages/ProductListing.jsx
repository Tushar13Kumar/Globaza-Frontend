import React, { useState } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FilterSection from "../components/FilterSection";
import { useEffect } from "react";
import ProductDetails from "./ProductDetails";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";




export default function ProductListing() {
  const { searchQuery } = useSearch();
  const {wishlist , AddToWishlist , RemoveWishlistItem} = useWishlist()
  const {cart , addToCart} = useCart()

  // ✅ Get category name from URL
  const { categoryName } = useParams();

  // ✅ Fetch all products
  const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products");
  const [cartItems , setCartItems] = useState([])
  const [wishlistItems , setWishlistItems] = useState([])
  const [categoryCheckBox , setCategoryCheckBox] = useState([])
  const [rating , setRating] = useState(0)
  const [sortPrice , setSortPrice] = useState("")

useEffect(() => {
  if (categoryName) {
    setCategoryCheckBox([categoryName]);
  }
}, [categoryName]);


  const handleCategory = (event) => {
    const {value , checked} = event.target

    if(checked){
      setCategoryCheckBox((prvCategory) => [...prvCategory , value])
    } else{
      setCategoryCheckBox((prvCategory) => prvCategory.filter(item => item  !== value) )
    }
  }

  const handleAddToCart = (id) => {
    if(cartItems.includes(id)){
      setCartItems(cartItems.filter((items) => items !== id))
    }else{
      setCartItems([...cartItems , id])


    }
  }

  const handleWishList = (id) => {
    if(wishlistItems.includes(id)){
      setWishlistItems(wishlistItems.filter(item => item !== id))

    } else {
setWishlistItems([...wishlistItems , id])

    }}

    const clearFilter = () => {
      setCategoryCheckBox([]);
      setRating(0)
    }
  const handleChangePriceSort = (event) => {
     setSortPrice(event.target.value)
  }

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">Error loading products.</p>;

// Replace productData with data everywhere 👇
let filterProductData = data|| [];

if (searchQuery.trim().length > 0) {
  filterProductData = filterProductData.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
}

// URL category
if (categoryName) {
  filterProductData = filterProductData.filter(
    product => product.category?.name === categoryName
  );
}

// Checkbox category
// Checkbox category (ONLY apply if user changed filters)
if (!categoryName && categoryCheckBox.length > 0) {
  filterProductData = filterProductData.filter(
    product => categoryCheckBox.includes(product.category?.name)
  );
}


// Rating
filterProductData = filterProductData.filter(
  product => product.rating >= rating
);

//lowToHigh
if(sortPrice === "lowToHigh"){
  filterProductData = [...filterProductData].sort((a,b) => a.price - b.price)
}

if(sortPrice === "HighToLow"){
  filterProductData = [...filterProductData].sort((a,b) => b.price - a.price)
}


  //console.log("Filtered products:", productData);

  return (
    <>
      <Header />
        

      <main className="container mt-4">
       <div className="row">
        <aside className="col-md-3">
         <div className="d-flex justify-content-between align-items-center mb-3">
          <h6 className="mb-0">Filter</h6>
          <button className="btn btn-sm btn-outline-danger" onClick={clearFilter}>Clear All</button>
         </div>
         <div className="container">
 <h6>Category</h6>

{Array.from(new Set((data || []).map(p => p.category?.name).filter(Boolean)))
  .map(cat => (
    <div key={cat}>
      <input
        type="checkbox"
        value={cat}
        checked={categoryCheckBox.includes(cat)}
        onChange={handleCategory}
      />
      {cat}
    </div>
))}
</div>


          <h6 className="mt-4">Rating</h6>
          <input type="range" max="5" min="0" step="0.5" value={rating} onChange={(e) => setRating(Number(e.target.value))}  />
          <p>Minimum Rating: ⭐ {rating}</p>
          <div>
             <h6>Sort by Price</h6>
            <form action="" onChange={handleChangePriceSort}>
              <br />
              <input type="radio" name="price" value="lowToHigh" checked={sortPrice === "lowToHigh"}  onChange={handleChangePriceSort}/>Low to High
              <br />
               <input type="radio" name="price" value="HighToLow" checked={sortPrice ==="HighToLow"}  onChange={handleChangePriceSort}/>High to Low
            </form>
          </div>
         
        </aside>
        <section className="col-md-9">
        <h2 className="text-center mb-4 text-capitalize">
          Products in {categoryName} {filterProductData.length}
        </h2>

        {/* ✅ If no products found */}
        {filterProductData.length === 0 && (
          <p className="text-center text-muted">No products found.</p>
        )}

        {/* ✅ Show products in grid */}
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {filterProductData.map((product) => (
            <div className="col" key={product._id}>
              <div className="card h-100 shadow-sm border-0">
                
                <button onClick={() => wishlist.some((item) => item._id === product._id) ? RemoveWishlistItem(product._id) : AddToWishlist(product) } className="btn position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm"> {wishlist.some((item) => item._id === product._id)? <i className="bi bi-heart-fill text-danger"></i>:<i className="bi bi-heart"></i> }
</button>
              <Link to={`/productDetails/${product._id}`} className="text-decoration-none">

                <img
                  src={product.image}
                  alt={product.name}
                  className="card-img-top"
                  style={{ objectFit: "cover", height: "200px" }}
                  
                />
                <div className="card-body text-center">
                  <h6 className="card-title">{product.name}</h6>
                  <h5 className="">₹{product.price}</h5>
                  <p ><i className="bi bi-star"></i> {product.rating}</p>

                </div>
                </Link>
                <button className="btn btn-primary" onClick={() => addToCart(product)}>{cart.some(item => item._id === product._id) ? "Go to Cart": "Add to Cart"}</button>

              </div>
            </div>
          ))}
        </div>
        </section>
        </div>
      </main>
    </>
  );
}
