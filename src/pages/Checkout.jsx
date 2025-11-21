import { useAddress } from "../context/AddressContext";

export default function Checkout() {
  const { addresses, selectedAddressId, selectAddress } = useAddress();

  return (
    <div className="container mt-4">
      <h3>Select Delivery Address</h3>

      {addresses.map(addr => (
        <div 
          key={addr.id} 
          className={`card p-3 mb-2 ${selectedAddressId === addr.id ? "border-success" : ""}`}
          style={{ cursor: "pointer" }}
          onClick={() => selectAddress(addr.id)}
        >
          <p><strong>{addr.name}</strong> | {addr.phone}</p>
          <p>{addr.house}, {addr.city}, {addr.state} - {addr.pincode}</p>

          {selectedAddressId === addr.id && (
            <p className="text-success fw-bold mt-2">✔ Selected for delivery</p>
          )}
        </div>
      ))}

      <button className="btn btn-success mt-4 w-100">
        Place Order
      </button>
    </div>
  );
}
