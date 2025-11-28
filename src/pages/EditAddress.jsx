import { useParams, useNavigate } from "react-router-dom";
import { useAddress } from "../context/AddressContext";
import { useState, useEffect } from "react";
import Header from "../components/Header";

export default function EditAddress() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addresses, updateAddress } = useAddress();

  const addressToEdit = addresses.find(a => String(a.id) === id);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    pincode: "",
    city: "",
    state: "",
    house: ""
  });

  useEffect(() => {
    if (addressToEdit) {
      setForm({
        name: addressToEdit.name || "",
        phone: addressToEdit.phone || "",
        pincode: addressToEdit.pincode || "",
        city: addressToEdit.city || "",
        state: addressToEdit.state || "",
        house: addressToEdit.house || ""
      });
    } else {
      navigate("/profile");
    }
  }, [addressToEdit, navigate]);

  // --- STRICT INPUT HANDLER ---
  const handleInput = (e) => {
    const { name, value } = e.target;
    let cleanValue = value;

    // RULE 1: Alphabets only (Name, City, State)
    // Regex: [^A-Za-z\s] means "replace anything that IS NOT a letter or space with empty string"
    if (["name", "city", "state"].includes(name)) {
      cleanValue = value.replace(/[^A-Za-z\s]/g, ""); 
    }

    // RULE 2: Numbers only (Phone, Pincode, House)
    // Regex: \D means "replace anything that IS NOT a digit with empty string"
    if (["phone", "pincode", "house"].includes(name)) {
      cleanValue = value.replace(/\D/g, ""); 
    }

    setForm({ ...form, [name]: cleanValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Final Validation: Check for empty strings or just whitespace
    for (let key in form) {
      if (!form[key].trim()) {
        alert(`${key.toUpperCase()} is required and cannot be empty.`);
        return;
      }
    }

    // specific length checks (Optional, but recommended)
    if (form.phone.length !== 10) {
        alert("Phone number must be exactly 10 digits");
        return;
    }

    updateAddress(Number(id), form);
    navigate("/profile");
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h2>Edit Address</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          
          {/* Alphabet Inputs */}
          <input required name="name" className="form-control mb-2" value={form.name} onChange={handleInput} placeholder="Name (Alphabets only)" />
          
          {/* Number Inputs */}
          <input required name="phone" maxLength={10} className="form-control mb-2" value={form.phone} onChange={handleInput} placeholder="Phone (Numbers only)" />
          <input required name="pincode" maxLength={6} className="form-control mb-2" value={form.pincode} onChange={handleInput} placeholder="Pincode (Numbers only)" />
          
          {/* Alphabet Inputs */}
          <input required name="city" className="form-control mb-2" value={form.city} onChange={handleInput} placeholder="City (Alphabets only)" />
          <input required name="state" className="form-control mb-2" value={form.state} onChange={handleInput} placeholder="State (Alphabets only)" />
          
          {/* Number Input */}
          <input required name="house" className="form-control mb-2" value={form.house} onChange={handleInput} placeholder="House No. (Numbers only)" />
          
          <button className="btn btn-primary w-100">Save Address</button>
        </form>
      </div>
    </>
  );
}