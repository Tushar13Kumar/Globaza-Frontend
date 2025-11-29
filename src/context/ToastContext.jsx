import React, { createContext, useContext } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  // Function to show a toast notification
  const showToast = (message, type = 'info') => {
    const options = {
      position: "bottom-right", // Common toast position
      autoClose: 2000,         // Closes after 2 seconds
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",        // Use colored theme for better visibility
    };

    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'error':
        toast.error(message, options);
        break;
      case 'warning':
        toast.warn(message, options);
        break;
      case 'info':
      default:
        toast.info(message, options);
        break;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {/* The ToastContainer must be rendered once at a high level */}
      <ToastContainer /> 
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);