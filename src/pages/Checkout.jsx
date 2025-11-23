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
        </main>
      </>
    );
  }

  const selectedAddress = addresses.find(a => a.id === selectedAddressId);

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
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

        {addresses.length === 0 && <p>No addresses saved. Go to Profile → Add Address</p>}

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
            disabled={loading}
          >
            {loading ? "Placing order..." : `Place Order ₹${totalPrice}`}
          </button>
        </div>
      </div>
    </>
  );
}
