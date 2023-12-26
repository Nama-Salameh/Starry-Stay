import React, { createContext, useContext, ReactNode, useState } from "react";
import { getNumberOfRooms } from "../../utils/storageUtils/cartStorage/CartStorage";

const CartContext = createContext<any>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialCartCount = getNumberOfRooms();
  const [cartCount, setCartCount] = useState(initialCartCount);

  const updateCartCount = (newCount: number) => {
    setCartCount(newCount);
  };
  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
