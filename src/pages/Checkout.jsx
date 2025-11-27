import Header from "../components/Header";
import { useAddress } from "../context/AddressContext";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Checkout() {
  const { addresses, selectedAddressId, selectAddress } = useAddress();
  const { cart, totalPrice, clearCart } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // if no cart items, suggest adding
  if (cart.length === 0) {
    return (
      <>
        <Header />
        <main className="container mt-4">
          <h3>Your cart is empty</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate('/')}>
               <i className="bi bi-shop me-2"></i> Continue Shopping
           </button>
        </main>
      </>
    );
  }

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      // Using useAlert is better here if available, but keeping the simple alert for consistency
      alert("Please select a delivery address first.");
      return;
    }

    setLoading(true);

    const orderData = {
      items: cart.map(i => ({ productId: i._id, name: i.name, price: i.price, qty: i.qty })),
      totalAmount: totalPrice,
      address: selectedAddress,
      createdAt: new Date().toISOString(),
      status: "placed"
    };

    const savedOrder = await placeOrder(orderData);

    // clear cart locally
    clearCart();

    setLoading(false);

    // navigate to success page with order id (fallback to timestamp)
    const orderId = savedOrder?.id || savedOrder?._id || Date.now();
    navigate(`/order-success/${orderId}`);
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <h3>Select Delivery Address</h3>

        {/* --- FIX: Check for no addresses and provide an action button --- */}
        {addresses.length === 0 && (
            <div className="alert alert-warning p-4 d-flex justify-content-between align-items-center">
                <p className="mb-0">
                    <i className="bi bi-info-circle me-2"></i> No delivery addresses saved.
                </p>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate("/add-address")}
                >
                    <i className="bi bi-plus-circle me-2"></i> Add New Address
                </button>
            </div>
        )}

        {addresses.map(addr => (
          <div
            key={addr.id}
            className={`card p-3 mb-2 ${selectedAddressId === addr.id ? "border-success border-3" : "border-1"}`}
            style={{ cursor: "pointer" }}
            onClick={() => selectAddress(addr.id)}
          >
            <p><strong>{addr.name}</strong> | {addr.phone}</p>
            <p className="mb-0">{addr.house}, {addr.city}, {addr.state} - <span className="fw-bold">{addr.pincode}</span></p>

            {selectedAddressId === addr.id && (
              <p className="text-success fw-bold mt-2 mb-0">✔ Selected for delivery</p>
            )}
          </div>
        ))}

        <hr />

        <h4>Order Summary</h4>
        <div className="card p-3">
          {cart.map(item => (
            <div key={item._id} className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <strong>{item.name}</strong> <br />
                <small>Qty: {item.qty}</small>
              </div>
              <div>₹{item.price * item.qty}</div>
            </div>
          ))}

          <hr />
          <div className="d-flex justify-content-between">
            <strong>Total</strong>
            <strong>₹{totalPrice}</strong>
          </div>

          <button
            className="btn btn-success mt-4 w-100"
            onClick={handlePlaceOrder}
            disabled={loading || addresses.length === 0} // Disable if no addresses are available
          >
            {loading ? "Placing order..." : `Place Order ₹${totalPrice}`}
          </button>
        </div>
      </div>
    </>
  );
}