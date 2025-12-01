import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useParams, Link, useNavigate } from "react-router-dom"; // 1. Added useNavigate
import useFetch from "../useFetch";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
// import { useAlert } from "../context/AlertContext";

export default function ProductListing() {
  // const { showAlert } = useAlert();
  const navigate = useNavigate(); // 2. Initialize navigate

  const { searchQuery } = useSearch();
  const { wishlist, AddToWishlist, RemoveWishlistItem } = useWishlist();
  
  // 3. Destructured addToCart instead of toggleCart for better control
  const { cart, addToCart } = useCart(); 

  const { categoryName } = useParams();
  const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/products");

  const [categoryCheckBox, setCategoryCheckBox] = useState([]);
  const [rating, setRating] = useState(0);
  const [sortPrice, setSortPrice] = useState("");
  const [showFilterOffcanvas, setShowFilterOffcanvas] = useState(false); 

  useEffect(() => {
    if (categoryName && categoryName !== "all") {
      setCategoryCheckBox([categoryName]);
    } else if (categoryName === "all" && categoryCheckBox.length > 0) {
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
    setShowFilterOffcanvas(false); 
  };

  // --- LOADING & ERROR STATES ---
  if (loading) {
    return (
      <>
        <Header />
        <main className="container mt-5 mb-5 text-center">
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

  // --- FILTERING LOGIC ---
  let filterProductData = data || [];

  if (searchQuery && searchQuery.trim().length > 0) {
    filterProductData = filterProductData.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (categoryCheckBox.length > 0) {
    filterProductData = filterProductData.filter(p => categoryCheckBox.includes(p.category?.name));
  }

  filterProductData = filterProductData.filter(p => p.rating >= rating);

  if (sortPrice === "lowToHigh") filterProductData = [...filterProductData].sort((a, b) => a.price - b.price);
  if (sortPrice === "highToLow") filterProductData = [...filterProductData].sort((a, b) => b.price - a.price);


  // --- FILTER CONTROLS COMPONENT ---
  const FilterControls = ({ isOffcanvas = false }) => (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h6 className="mb-0">Filter</h6>
        <button className="btn btn-sm btn-outline-danger" onClick={clearFilter}>Clear All</button>
      </div>

      <div className="mb-4">
        <h6>Category</h6>
        {Array.from(new Set((data || []).map(p => p.category?.name).filter(Boolean))).map(cat => (
          <div key={cat} className="form-check">
            <input 
                type="checkbox" 
                className="form-check-input"
                id={`cat-${cat}`}
                value={cat} 
                checked={categoryCheckBox.includes(cat)} 
                onChange={handleCategory} 
            />
            <label className="form-check-label" htmlFor={`cat-${cat}`}>{cat}</label>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h6>Rating</h6>
        <input 
            type="range" 
            className="form-range"
            max="5" 
            min="0" 
            step="0.5" 
            value={rating} 
            onChange={(e) => setRating(Number(e.target.value))} 
        />
        <p className="mb-0">Minimum Rating: ⭐ <strong className="text-primary">{rating}</strong></p>
      </div>
<div className="mb-4">
  <h6>Sort by Price</h6>

  <div>
    {/* Low to High */}
    <div className="form-check">
      <input
        type="radio"
        className="form-check-input"
        id="lowToHigh"
        name="price"
        value="lowToHigh"
        checked={sortPrice === "lowToHigh"}
        onChange={(e) => {
          setSortPrice(e.target.value);
          // if (isOffcanvas) setShowFilterOffcanvas(false);
        }}
      />
      <div
        htmlFor="lowToHigh"
        className={`form-check-label ${
          sortPrice === "lowToHigh" ? "fw-bold text-primary" : ""
        }`}
      >
        Low to High
      </div>
    </div>

    {/* High to Low */}
    <div className="form-check">
      <input
        type="radio"
        className="form-check-input"
        id="highToLow"
        name="price"
        value="highToLow"
        checked={sortPrice === "highToLow"}
        onChange={(e) => {
          setSortPrice(e.target.value);
          // if (isOffcanvas) setShowFilterOffcanvas(false);
        }}
      />
      <div
        htmlFor="highToLow"
        className={`form-check-label ${
          sortPrice === "highToLow" ? "fw-bold text-primary" : ""
        }`}
      >
        High to Low
      </div>
    </div>
  </div>
</div>

    </>
  );


  return (
    <>
      <Header />
      <main className="container mt-4 mb-5">
        
        {/* --- MOBILE FILTER --- */}
        <div className="d-md-none sticky-top bg-light shadow-sm p-2 mb-3 z-3">
            <div className="d-flex justify-content-around">
                <button 
                    className="btn btn-outline-primary w-50 me-2" 
                    onClick={() => setShowFilterOffcanvas(true)}
                >
                    <i className="bi bi-funnel me-1"></i> Filter
                </button>
                <select 
                    className="form-select w-50" 
                    value={sortPrice} 
                    onChange={(e) => setSortPrice(e.target.value)}
                >
                    <option value="">Sort By...</option>
                    <option value="lowToHigh">Price: Low to High</option>
                    <option value="highToLow">Price: High to Low</option>
                </select>
            </div>
        </div>

        <h2 className="text-center text-md-start mb-4 text-capitalize">
            {categoryName && categoryName !== "all" ? `${categoryName} Products` : "All Products"} 
            <span className="text-muted fs-5"> ({filterProductData.length})</span>
        </h2>


        <div className="row">
          
          <aside className="col-md-3 d-none d-md-block">
                <div className="sticky-top" style={{top: '80px'}}>
                    <FilterControls />
                </div>
          </aside>

          <section className="col-12 col-md-9">
            
            {filterProductData.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-box-seam h1 text-muted"></i>
                <p className="text-muted lead">No products match your current filters or search.</p>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4">
                {filterProductData.map(product => (
                 <div className="col" key={product._id}>
                      <div className="product-card card h-100 shadow-sm border-0 position-relative d-flex flex-column hover-shadow">

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

                            {/* Image & Body Link */}
                            <Link to={`/productDetails/${product._id}`} className="text-decoration-none d-flex flex-column flex-grow-1">
                                <img
                                    src={product.image || "https://via.placeholder.com/400x300.png?text=No+Image"}
                                    alt={product.name}
                                    className="card-img-top product-img"
                                    style={{ objectFit: 'cover', height: '180px' }}
                                />

                                <div className="card-body text-center d-flex flex-column justify-content-between">
                                    <h6 className="card-title text-dark fw-normal mb-2">{product.name}</h6>
                                    <div>
                                        <h5 className="text-primary fw-bold">₹{product.price}</h5>
                                        <p className="mb-1 text-muted">
                                            <i className="bi bi-star-fill text-warning me-1"></i> {product.rating}
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* 5. ADD TO CART / GO TO CART LOGIC */}
                            <div className="card-footer bg-white border-0 mt-auto">
                                <button
                                    className={`btn w-100 ${cart.some(item => item._id === product._id) ? "btn-outline-success" : "btn-primary"}`}
                                    onClick={() => {
                                        const isInCart = cart.some(item => item._id === product._id);
                                        if (isInCart) {
                                            navigate("/cart"); // Redirects to Cart Page
                                        } else {
                                            addToCart(product); // Adds to cart
                                        }
                                    }}
                                >
                                    {cart.some(item => item._id === product._id) ? "Go to cart" : "Add to Cart"}
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

      {/* --- MOBILE FILTER OFFACNVAS --- */}
      <div 
        className={`offcanvas offcanvas-start d-md-none ${showFilterOffcanvas ? ' show' : ''}`} 
        tabIndex="-1" 
        id="offcanvasFilter" 
        aria-labelledby="offcanvasFilterLabel"
        style={{ visibility: showFilterOffcanvas ? 'visible' : 'hidden' }}
      >
        <div className="offcanvas-header shadow-sm">
          <h5 className="offcanvas-title fw-bold text-primary" id="offcanvasFilterLabel">Apply Filters</h5>
          <button 
            type="button" 
            className="btn-close" 
            onClick={() => setShowFilterOffcanvas(false)} 
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <FilterControls isOffcanvas={true} />
        </div>
      </div>
      
      {showFilterOffcanvas && (
          <div className="offcanvas-backdrop fade show d-md-none" onClick={() => setShowFilterOffcanvas(false)}></div>
      )}
    </>
  );
}