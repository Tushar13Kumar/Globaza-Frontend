import { Link } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import { useState } from "react";
import Header from "../components/Header";

// --- Validation Helpers (Repeated for Profile.jsx) ---
const validateName = (value) => /^[a-zA-Z\s]+$/.test(value.trim()); 
const validateNumber = (value) => /^[0-9]+$/.test(value.trim()); 
const validateHouse = (value) => /^[a-zA-Z0-9\s/,-]+$/.test(value.trim()); 

export default function Profile() {
  const { addresses, selectedAddressId, addAddress, deleteAddress, selectAddress } = useAddress();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    house: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // --- Validation Check ---
    if (!form.name.trim() || !form.city.trim() || !form.state.trim() || !form.phone.trim() || !form.pincode.trim() || !form.house.trim()) {
        alert("All fields are required.");
        return;
    }

    if (!validateName(form.name)) {
        alert("Name must contain only alphabets and spaces.");
        return;
    }
    if (!validateName(form.city)) {
        alert("City must contain only alphabets and spaces.");
        return;
    }
    if (!validateName(form.state)) {
        alert("State must contain only alphabets and spaces.");
        return;
    }
    if (!validateNumber(form.phone) || form.phone.length < 10) {
        alert("Phone must contain only numbers and be at least 10 digits.");
        return;
    }
    if (!validateNumber(form.pincode) || form.pincode.length !== 6) {
        alert("Pincode must contain 6 numbers only.");
        return;
    }
    if (!validateHouse(form.house)) {
        alert("House No./Area can contain alphabets, numbers, spaces, /, -, or comma.");
        return;
    }
    // --- End Validation Check ---

    addAddress(form);
    setForm({ name:"", phone:"", pincode:"", city:"", state:"", house:"" });
  };

  return (
     <>
        <Header/>
    <div className="container mt-4">

      <h2>Manage Addresses</h2>

      {/* ADD Address */}
      <form className="mt-3" onSubmit={handleSubmit}>
        <input 
             required
             className="form-control mb-2" 
             placeholder="Name"
             name="name"
             value={form.name}
             onChange={handleChange}
             type="text"
        />

        <input 
             required
             className="form-control mb-2" 
             placeholder="Phone"
             name="phone"
             value={form.phone}
             onChange={handleChange}
             type="tel"
             maxLength="10"
        />

        <input 
             required
             className="form-control mb-2" 
             placeholder="Pincode"
             name="pincode"
             value={form.pincode}
             onChange={handleChange}
             type="text"
             maxLength="6"
        />

        <input 
             required
             className="form-control mb-2" 
             placeholder="City"
             name="city"
             value={form.city}
             onChange={handleChange}
             type="text"
        />

        <input 
             required
             className="form-control mb-2" 
             placeholder="State"
             name="state"
             value={form.state}
             onChange={handleChange}
             type="text"
        />

        <input 
             required
             className="form-control mb-2" 
             placeholder="House No., Area"
             name="house"
             value={form.house}
             onChange={handleChange}
             type="text"
        />

        <button className="btn btn-primary w-100">Add Address</button>
      </form>

      <hr />

      {/* LIST OF ADDRESSES (Rest of the component remains the same) */}
      <h4>Your Saved Addresses</h4>
      {addresses.length === 0 && <p>No addresses added.</p>}

      {addresses.map(addr => (
        <div 
          key={addr.id} 
          className={`card p-3 mb-3 ${selectedAddressId === addr.id ? "border-primary" : ""}`}
        >
          <p><strong>{addr.name}</strong> | {addr.phone}</p>
          <p>{addr.house}, {addr.city}, {addr.state} - {addr.pincode}</p>

          <div className="d-flex gap-2 mt-2">
            <button
              className="btn btn-outline-primary"
              onClick={() => selectAddress(addr.id)}>
              {selectedAddressId === addr.id ? "Selected ✔" : "Select Address"}
            </button>

            <Link to={`/edit-address/${addr.id}`} className="btn btn-warning">
              Edit
            </Link>

            <button className="btn btn-danger"
              onClick={() => deleteAddress(addr.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}