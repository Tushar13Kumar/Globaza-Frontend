import Header from "../components/Header";
import { useAddress } from "../context/AddressContext";
import { useOrder } from "../context/OrderContext";
import { Link } from "react-router-dom";
// Note: Profile, EditAddress, AddAddress are imported but not used in the User component itself.

export default function User() {
  const { addresses, deleteAddress } = useAddress();
  const { orders } = useOrder();

  // Static user details (you can change manually)
  const user = {
    name: "Tushar Kumar",
    email: "tushar@example.com",
    phone: "+91 9876543210",
  };

  // 🎯 The orders array needs to be sorted to show the newest orders first.
  // We create a copy of the array using spread operator [...] before sorting
  // to avoid mutating the original state directly, which is a good practice in React.
  const sortedOrders = [...orders].sort((a, b) => {
    // Assuming 'createdAt' is a timestamp string (or number)
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  return (
    <>
      <Header />
      <div className="container mt-4">

        {/* USER DETAILS SECTION (Unchanged) */}
        <h2>User Profile</h2>
        <div className="card p-3 shadow-sm mt-3">
          <h5>{user.name}</h5>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
        </div>

        <hr />

        {/* ADDRESS SECTION (Unchanged) */}
        <div className="d-flex justify-content-between align-items-center">
          <h3>Saved Addresses</h3>
          <Link to="/add-address" className="btn btn-primary">
            + Add New Address
          </Link>
        </div>

        {addresses.length === 0 && <p>No saved addresses.</p>}

        {addresses.map((addr) => (
          <div key={addr.id} className="card p-3 mb-2 shadow-sm mt-3">
            <strong>{addr.name}</strong> | {addr.phone}
            <p>{addr.house}, {addr.city}, {addr.state} - {addr.pincode}</p>

            <div className="d-flex gap-2">
              <Link
                to={`/edit-address/${addr.id}`}
                className="btn btn-sm btn-warning"
              >
                Edit
              </Link>

              <button
                className="btn btn-sm btn-danger"
                onClick={() => deleteAddress(addr.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        <hr />

        {/* ORDER HISTORY (Modified to use sortedOrders) */}
        <h3>Order History</h3>

        {orders.length === 0 && <p>No orders placed yet.</p>}

        {sortedOrders.map((o) => ( // 🎯 Changed 'orders' to 'sortedOrders'
          <div className="card p-3 mb-2 shadow-sm" key={o.id || o._id}>
            <p><strong>Order ID:</strong> {o.id || o._id}</p>
            <p><strong>Total:</strong> ₹{o.totalAmount}</p>
            <p><strong>Date:</strong> {new Date(o.createdAt).toLocaleString()}</p>

            <h6>Items:</h6>
            <ul>
              {o.items.map((item, i) => (
                <li key={i}>
                  {item.name} — Qty: {item.qty}
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </>
  );
}