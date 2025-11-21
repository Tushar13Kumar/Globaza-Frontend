import { createContext, useContext, useState } from "react";

const AddressContext = createContext();

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState([]);

  const [selectedAddressId, setSelectedAddressId] = useState(null);

  // ADD new address
  const addAddress = (newAddress) => {
    setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
  };

  // DELETE address
  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));

    // If deleted address was selected → remove selection
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  // UPDATE address
  const updateAddress = (id, updatedData) => {
    setAddresses(
      addresses.map(addr => addr.id === id ? { ...addr, ...updatedData } : addr)
    );
  };

  // SELECT ONLY ONE address for delivery
  const selectAddress = (id) => {
    setSelectedAddressId(id);
  };

  return (
    <AddressContext.Provider 
      value={{
        addresses,
        selectedAddressId,
        addAddress,
        deleteAddress,
        updateAddress,
        selectAddress
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export const useAddress = () => useContext(AddressContext);
