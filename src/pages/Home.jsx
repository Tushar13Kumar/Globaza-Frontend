import React from "react";
import useFetch from "../useFetch";
import Header from "../components/Header";
import {Link} from "react-router-dom"

export default function Home() {
  const { data, loading, error } = useFetch("https://backend-globaza.vercel.app/categories");

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">Error loading categories.</p>;

  return (
    <>
      <Header />
      <main>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-5 g-4">
          {data?.slice(0, 5).map((category) => (
            <div className="col" key={category.id}>
            <Link to={`/productListing/${encodeURIComponent(category.name)}`} className="text-decoration-none">
               <div className="card h-100 border-0 shadow-sm hover-card">
                <img
                  src={category.image}
                  className="card-img-top rounded"
                  alt={category.name}
                  style={{ objectFit: "cover", height: "200px" }}

                />
                 <div className="card-body text-center">
                    <h5 className="card-title text-dark">{category.name}</h5>
                  </div>
              </div>
            </Link>

             
            </div>
          ))}
        </div>
      </div>
      <div className=" container mt-4">
           {data?.slice(0,1).map((category) => (
            <div className="col" key={category.id}>
              <Link to={`/productListing/${encodeURIComponent(category.name)}`} className="text-decoration-none">
              <img src={category.image}
                  className="card-img-top rounded"
                  alt={category.name}
                  style={{ objectFit: "cover", height: "800px" }} />
              </Link>
            </div>
           ))}
      </div>
      <div className="container mt-4">
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {data?.slice(0,2).map((category, index) => 
          <div className="col" key={category.id}>
            <Link to={`/productListing/${encodeURIComponent(category.name)}`} className="text-decoration-none">
            <div className="card h-100 border-0 shadow-sm position-relative overflow-hidden">
            <img src={category.image} alt={category.name} className="card-img-top rounded" style={{objectFit: "cover" , height: "400px" , width:"100%"}}/>
           
            {/* //for overlay text */}
            <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{background: "rgba(0,0,0,0.4)" , textAlign:"center" , color: "white"}}>
              <h4 className="fw-bold mb-1">{index === 0 ? "🧥 New Arrivals for Winter"
      : "☀️ New Arrivals for Summer Collection"}</h4>

            </div>
             </div>
            </Link>
            
          </div>
          )}
        </div>
      </div>
      </main>
      <div className="container mt-4"></div>
    </>
  );
}
