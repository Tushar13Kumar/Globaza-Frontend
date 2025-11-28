import Header from "../components/Header";
import { useAddress } from "../context/AddressContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddAddress() {
  const { addAddress } = useAddress();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    house: "",
  });

  // --- STRICT INPUT HANDLER (Same as EditAddress) ---
  const handleInput = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;

    if (["name", "city", "state"].includes(name)) {
      cleanValue = value.replace(/[^A-Za-z\s]/g, ""); 
    }

    if (["phone", "pincode", "house"].includes(name)) {
      cleanValue = value.replace(/\D/g, ""); 
    }

    setForm({ ...form, [name]: cleanValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check for empty fields
    for (let key in form) {
      if (!form[key].trim()) {
        alert(`${key.toUpperCase()} is required.`);
        return;
      }
    }
    
    // Optional length check
    if(form.phone.length !== 10) {
        alert("Phone must be 10 digits");
        return;
    }

    addAddress(form);
    navigate("/profile");
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Add New Address</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
            <input required name="name" className="form-control mb-2" value={form.name} onChange={handleInput} placeholder="Name" />
            <input required name="phone" maxLength={10} className="form-control mb-2" value={form.phone} onChange={handleInput} placeholder="Phone" />
            <input required name="pincode" maxLength={6} className="form-control mb-2" value={form.pincode} onChange={handleInput} placeholder="Pincode" />
            <input required name="city" className="form-control mb-2" value={form.city} onChange={handleInput} placeholder="City" />
            <input required name="state" className="form-control mb-2" value={form.state} onChange={handleInput} placeholder="State" />
            <input required name="house" className="form-control mb-2" value={form.house} onChange={handleInput} placeholder="House No." />
            
            <button className="btn btn-success w-100">Save Address</button>
        </form>
      </div>
    </>
  );
}