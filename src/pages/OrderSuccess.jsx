import Header from "../components/Header";
import { useParams, Link } from "react-router-dom";

export default function OrderSuccess() {
  const { orderId } = useParams();
  return (
    <>
      <Header />
      <main className="container mt-4 text-center">
        <h2>Order Placed Successfully ✅</h2>
        <p>Your order id: <strong>{orderId}</strong></p>
        <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
        <Link to="/profile" className="btn btn-outline-secondary mt-3 ms-2">My Orders / Profile</Link>
      </main>
    </>
  )
}
