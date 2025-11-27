import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";
import useFetch from "../useFetch";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

export default function ProductListing() {
  const { searchQuery } = useSearch();
  const { wishlist, AddToWishlist, RemoveWishlistItem } = useWishlist();
  const { cart, addToCart , toggleCart } = useCart();

  const { categoryName } = useParams(); // must match App route
  const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products");
  console.log(categoryName)

  const [categoryCheckBox, setCategoryCheckBox] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortPrice, setSortPrice] = useState("");

 // In ProductListing.jsx
useEffect(() => {
 // Only set the category checkbox if categoryName is present AND not the placeholder 'all'
 if (categoryName && categoryName !== "all") {
    setCategoryCheckBox([categoryName]);
 } else if (categoryName === "all" && categoryCheckBox.length > 0) {
    // Optional: Clear category filter when navigating to /all via search
    setCategoryCheckBox([]); 
 }
}, [categoryName]);

  const handleCategory = (event) => {
    const { value, checked } = event.target;
    if (checked) setCategoryCheckBox(prev => [...prev, value]);
    else setCategoryCheckBox(prev => prev.filter(item => item !== value));
  };

  const clearFilter = () => {
    setCategoryCheckBox([]);
    setRating(0);
    setSortPrice("");
  };

  // 1. --- CLEAN LOADING STATE CHECK ---
  if (loading) {
    return (
      <>
        <Header />
        <main className="container mt-5 mb-5 text-center">
          {/* Using Bootstrap spinner for a professional look */}
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
            <div className="spinner-border text-primary me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="lead m-0">Loading product details...</p>
          </div>
        </main>
      </>
    );
  }
  
  // 2. --- ERROR STATE CHECK ---
  if (error) {
    return (
      <>
        <Header />
        <main className="container mt-5 mb-5 text-center">
          <p className="text-danger lead">
             <i className="bi bi-x-octagon-fill me-2"></i> Error fetching product details.
          </p>
        </main>
      </>
    );
  }



  let filterProductData = data || [];

 
/// From your ProductListing.jsx:
// 1. Global header search
if (searchQuery && searchQuery.trim().length > 0) {
 filterProductData = filterProductData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
}

 // **2. COMBINED Category Filter (THE FIX)**
 // Only filter products if one or more checkboxes are selected.
 if (categoryCheckBox.length > 0) {
filterProductData = filterProductData.filter(p => categoryCheckBox.includes(p.category?.name));
}

// 3. Rating
filterProductData = filterProductData.filter(p => p.rating >= rating);


  // Sort
  if (sortPrice === "lowToHigh") filterProductData = [...filterProductData].sort((a, b) => a.price - b.price);
  if (sortPrice === "highToLow") filterProductData = [...filterProductData].sort((a, b) => b.price - a.price);

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

            <div>
              <h6>Category</h6>
              {Array.from(new Set((data || []).map(p => p.category?.name).filter(Boolean))).map(cat => (
                <div key={cat}>
                  <input type="checkbox" value={cat} checked={categoryCheckBox.includes(cat)} onChange={handleCategory} /> {cat}
                </div>
              ))}
            </div>

            <h6 className="mt-4">Rating</h6>
            <input type="range" max="5" min="0" step="0.5" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
            <p>Minimum Rating: ⭐ {rating}</p>

            <h6 className="mt-3">Sort by Price</h6>
            <div onChange={(e) => setSortPrice(e.target.value)}>
              <div>
                <input type="radio" name="price" value="lowToHigh" checked={sortPrice === "lowToHigh"} onChange={() => { }} /> Low to High
              </div>
              <div>
                <input type="radio" name="price" value="highToLow" checked={sortPrice === "highToLow"} onChange={() => { }} /> High to Low
              </div>
            </div>
          </aside>

          <section className="col-md-9">
            <h2 className="text-center mb-4 text-capitalize">Products {categoryName ? `in ${categoryName}` : ""} ({filterProductData.length})</h2>

            {filterProductData.length === 0 ? (
              <p className="text-center text-muted">No products found.</p>
            ) : (
              <div className="row row-cols-1 row-cols-md-4 g-4">
                {filterProductData.map(product => (
                 <div className="col" key={product._id}>
  <div className="product-card card h-100 shadow-sm border-0 position-relative d-flex flex-column">

    {/* Wishlist Button */}
    <button
      onClick={() =>
        wishlist.some(i => i._id === product._id)
          ? RemoveWishlistItem(product._id)
          : AddToWishlist(product)
      }
      className="btn position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm z-3"
    >
      {wishlist.some(i => i._id === product._id)
        ? <i className="bi bi-heart-fill text-danger"></i>
        : <i className="bi bi-heart"></i>
      }
    </button>

    {/* Image */}
    <Link to={`/productDetails/${product._id}`} className="text-decoration-none">
      <img
        src={product.image || "https://via.placeholder.com/400x300.png?text=No+Image"}
        alt={product.name}
        className="card-img-top product-img"
      />

      {/* Body */}
      <div className="card-body text-center d-flex flex-column">
        <h6 className="card-title flex-grow-1">{product.name}</h6>
        <h5>₹{product.price}</h5>
        <p className="mb-1">
          <i className="bi bi-star"></i> {product.rating}
        </p>
      </div>
    </Link>

    {/* Add to Cart Button (sticks at bottom) */}
    <div className="card-footer bg-white border-0 mt-auto">
      <button
        className="btn btn-primary w-100"
        onClick={() => toggleCart(product)}
      >
        {cart.some(item => item._id === product._id) ? "Go to Cart" : "Add to Cart"}
      </button>
    </div>

  </div>
</div>

                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

