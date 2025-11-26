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

  const handleSubmit = (e) => {
    e.preventDefault();
    addAddress(form);
    navigate("/profile");
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Add New Address</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          {Object.keys(form).map((key) => (
            <input
              key={key}
              className="form-control mb-2"
              placeholder={key.toUpperCase()}
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          ))}
          <button className="btn btn-success w-100">Save Address</button>
        </form>
      </div>
    </>
  );
}
