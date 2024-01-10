import React, { createContext, useContext, ReactNode, useState } from "react";
import { addRoomToCart, getNumberOfRooms } from "../../utils/storageUtils/cartStorage/CartStorage";

const CartContext = createContext<any>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const initialCartCount = getNumberOfRooms();
  const [cartCount, setCartCount] = useState(initialCartCount);

  const updateCartCount = (newCount: number) => {
    setCartCount(newCount);
  };

  const handleAddToCart = (hotelId: number, roomNumber: number) => {
    if (addRoomToCart({ hotelId, roomNumber })) {
      updateCartCount(cartCount + 1);
    }
  };
  return (
    <CartContext.Provider value={{ cartCount, updateCartCount, handleAddToCart }}>
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
