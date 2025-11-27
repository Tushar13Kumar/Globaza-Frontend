import { createContext, useContext, useState, useEffect } from "react"; // 👈 Import useEffect

const OrderContext = createContext();

export function OrderProvider({ children }) {
  // 1. Initialize state from localStorage (or [])
  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("globlaza_orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // 2. Save orders to localStorage whenever orders changes
  useEffect(() => {
    localStorage.setItem("globlaza_orders", JSON.stringify(orders));
  }, [orders]);

  const placeOrder = async (orderData) => {
    try {
      // ... existing fetch logic ...
      const response = await fetch("https://backend-globaza.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error("Network response not ok");
      const savedOrder = await response.json();
      
      // Update state, which triggers localStorage save
      setOrders(prev => [...prev, savedOrder]);
      return savedOrder;
    } catch (error) {
      console.error("Order saving failed:", error);
      const fallback = { id: Date.now(), ...orderData, status: "failed-to-sync" };
      
      // Update state, which triggers localStorage save
      setOrders(prev => [...prev, fallback]);
      return fallback;
    }
  };

  return (
    <OrderContext.Provider value={{ orders, placeOrder }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);