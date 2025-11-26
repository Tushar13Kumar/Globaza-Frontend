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
  const { cart, addToCart } = useCart();

  const { categoryName } = useParams(); // must match App route
  const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products");

  const [categoryCheckBox, setCategoryCheckBox] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortPrice, setSortPrice] = useState("");

  useEffect(() => {
    if (categoryName) setCategoryCheckBox([categoryName]);
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

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">Error loading products.</p>;

  let filterProductData = data || [];

  // global header search
  if (searchQuery && searchQuery.trim().length > 0) {
    filterProductData = filterProductData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // URL category filter
  if (categoryName) {
    filterProductData = filterProductData.filter(p => p.category?.name === categoryName);
  }

  // Checkbox category (applies if user selected checkboxes)
  if (!categoryName && categoryCheckBox.length > 0) {
    filterProductData = filterProductData.filter(p => categoryCheckBox.includes(p.category?.name));
  }

  // Rating
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
                    <div className="card h-100 shadow-sm border-0 position-relative">
                      <button onClick={() => wishlist.some(i => i._id === product._id) ? RemoveWishlistItem(product._id) : AddToWishlist(product)}
                        className="btn position-absolute top-0 end-0 m-2 p-2 bg-white rounded-circle shadow-sm">
                        {wishlist.some(i => i._id === product._id) ? <i className="bi bi-heart-fill text-danger"></i> : <i className="bi bi-heart"></i>}
                      </button>

                      <Link to={`/productDetails/${product._id}`} className="text-decoration-none">
                        <img src={product.image} alt={product.name} className="card-img-top" style={{ objectFit: "cover", height: "200px" }} />
                        <div className="card-body text-center">
                          <h6 className="card-title">{product.name}</h6>
                          <h5>₹{product.price}</h5>
                          <p><i className="bi bi-star"></i> {product.rating}</p>
                        </div>
                      </Link>

                      <div className="card-footer bg-white border-0">
                        <button className="btn btn-primary w-100" onClick={() => addToCart(product)}>
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
