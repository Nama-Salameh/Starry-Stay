const CART_KEY = "cart";

export function storeCart(cart: { hotelId: number; roomNumber: number }[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

export function getAllRoomsFromCart(): {
  hotelId: number;
  roomNumber: number;
}[] {
  const storedCart = localStorage.getItem(CART_KEY);
  return storedCart ? JSON.parse(storedCart) : [];
}

export function addRoomToCart(room: { hotelId: number; roomNumber: number }) {
  const cart = getAllRoomsFromCart();
  const isRoomInCart = cart.some(
    (cartItem) =>
      cartItem.hotelId === room.hotelId &&
      cartItem.roomNumber === room.roomNumber
  );
  if (!isRoomInCart) {
    storeCart([...cart, room]);
    return true;
  }
  return false;
}

export function removeRoomFromCart(room: {
  hotelId: number;
  roomNumber: number;
}) {
  const cart = getAllRoomsFromCart();
  const updatedCart = cart.filter(
    (cartItem) =>
      cartItem.hotelId !== room.hotelId ||
      cartItem.roomNumber !== room.roomNumber
  );
  storeCart(updatedCart);
}

export function RemoveAllRoomsFromCart() {
  localStorage.removeItem(CART_KEY);
}

export function getNumberOfRooms(): number {
  const cart = getAllRoomsFromCart();
  return cart.length;
}
