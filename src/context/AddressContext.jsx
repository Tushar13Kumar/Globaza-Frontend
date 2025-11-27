import { createContext, useContext, useState, useEffect } from "react"; // 👈 Import useEffect

const AddressContext = createContext();

export function AddressProvider({ children }) {
  // 1. Initialize state from localStorage (or [])
  const [addresses, setAddresses] = useState(() => {
    const savedAddresses = localStorage.getItem("globlaza_addresses");
    return savedAddresses ? JSON.parse(savedAddresses) : [];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const savedSelectedId = localStorage.getItem("globlaza_selected_address_id");
    return savedSelectedId ? JSON.parse(savedSelectedId) : null;
  });

  // 2. Save addresses to localStorage whenever addresses changes
  useEffect(() => {
    localStorage.setItem("globlaza_addresses", JSON.stringify(addresses));
  }, [addresses]);

  // 3. Save selectedAddressId to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("globlaza_selected_address_id", JSON.stringify(selectedAddressId));
  }, [selectedAddressId]);


  // IMPORTANT: Ensure your CRUD operations still work with Date.now() for unique IDs.

  // ADD new address (no change needed here)
  const addAddress = (newAddress) => {
    setAddresses([...addresses, { id: Date.now(), ...newAddress }]);
  };

  // DELETE address (no change needed here)
  const deleteAddress = (id) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    if (selectedAddressId === id) {
      setSelectedAddressId(null);
    }
  };

  // UPDATE address (no change needed here)
  const updateAddress = (id, updatedData) => {
    setAddresses(
      addresses.map(addr => addr.id === id ? { ...addr, ...updatedData } : addr)
    );
  };

  // SELECT ONLY ONE address (no change needed here)
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