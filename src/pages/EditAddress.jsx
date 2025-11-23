import { useParams, useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import { useState } from "react";
import Header from "../components/Header";

export default function EditAddress() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addresses, updateAddress } = useAddress();

  const addressToEdit = addresses.find(a => a.id === Number(id));

  const [form, setForm] = useState(addressToEdit || {});

  const handleSubmit = (e) => {
    e.preventDefault();
    updateAddress(Number(id), form);
    navigate("/profile");
  };

  return (
     <>
        <Header/>
    <div className="container mt-4">
      <h2>Edit Address</h2>

      <form className="mt-3" onSubmit={handleSubmit}>
        <input className="form-control mb-2" 
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Name"
        />

        <input className="form-control mb-2" 
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="Phone"
        />

        <input className="form-control mb-2" 
          value={form.pincode}
          onChange={(e) => setForm({ ...form, pincode: e.target.value })}
          placeholder="Pincode"
        />

        <input className="form-control mb-2" 
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
          placeholder="City"
        />

        <input className="form-control mb-2" 
          value={form.state}
          onChange={(e) => setForm({ ...form, state: e.target.value })}
          placeholder="State"
        />

        <input className="form-control mb-2"
          value={form.house}
          onChange={(e) => setForm({ ...form, house: e.target.value })}
          placeholder="House No. / Area"
        />

        <button className="btn btn-primary w-100">Save Address</button>
      </form>
    </div>
    </>
  );
}
