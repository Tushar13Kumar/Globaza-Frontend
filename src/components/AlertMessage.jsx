import { useAlert } from "../context/AlertContext";

export default function AlertMessage() {
  const { alert } = useAlert();

  if (!alert.message) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        padding: "10px 16px",
        backgroundColor: alert.type === "error" ? "#ff4d4d" : "#4BB543",
        color: "white",
        borderRadius: "8px",
        zIndex: 1000,
        fontWeight: "bold",
      }}
    >
      {alert.message}
    </div>
  );
}
