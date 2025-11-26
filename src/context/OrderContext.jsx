import { createContext, useContext, useState } from "react";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const placeOrder = async (orderData) => {
    try {
      const response = await fetch("https://backend-globaza.vercel.app/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error("Network response not ok");
      const savedOrder = await response.json();
      setOrders(prev => [...prev, savedOrder]);
      return savedOrder;
    } catch (error) {
      console.error("Order saving failed:", error);
      const fallback = { id: Date.now(), ...orderData, status: "failed-to-sync" };
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
