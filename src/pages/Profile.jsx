import { Link } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import { useState } from "react";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(form);
    setForm({ name:"", phone:"", pincode:"", city:"", state:"", house:"" });
  };

  return (
    <div className="container mt-4">

      <h2>Manage Addresses</h2>

      {/* ADD Address */}
      <form className="mt-3" onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name"
               value={form.name}
               onChange={(e) => setForm({ ...form, name: e.target.value })}/>

        <input className="form-control mb-2" placeholder="Phone"
               value={form.phone}
               onChange={(e) => setForm({ ...form, phone: e.target.value })}/>

        <input className="form-control mb-2" placeholder="Pincode"
               value={form.pincode}
               onChange={(e) => setForm({ ...form, pincode: e.target.value })}/>

        <input className="form-control mb-2" placeholder="City"
               value={form.city}
               onChange={(e) => setForm({ ...form, city: e.target.value })}/>

        <input className="form-control mb-2" placeholder="State"
               value={form.state}
               onChange={(e) => setForm({ ...form, state: e.target.value })}/>

        <input className="form-control mb-2" placeholder="House No., Area"
               value={form.house}
               onChange={(e) => setForm({ ...form, house: e.target.value })}/>

        <button className="btn btn-primary w-100">Add Address</button>
      </form>

      <hr />

      {/* LIST OF ADDRESSES */}
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
  );
}
