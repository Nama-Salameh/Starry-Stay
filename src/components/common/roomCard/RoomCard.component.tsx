import React, { useEffect, useState, startTransition } from "react";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router";
import LoginModal from "../../modals/LoginModal.component";
import localization from "../../../localizationConfig";
import style from "./RoomCard.module.css";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GroupsIcon from "@mui/icons-material/Groups";
import {
  RemoveAllRoomsFromCart,
  addRoomToCart,
  getAllRoomsFromCart,
} from "../../../utils/storageUtils/cartStorage/CartStorage";
import { useCartContext } from "../../../contexts/cartContext/CartContext.context";
import { isLoggedIn, isSessionExpired } from "../../../utils/TokenUtils";

type Room = {
  roomId: number;
  roomNumber: number;
  roomPhotoUrl: string;
  roomType: string;
  price: number;
  capacityOfAdults: number;
  capacityOfChildren: number;
  availability: boolean;
  roomAmenities: {
    name: string;
    description: string;
  };
};

export default function RoomCard({
  room,
  hotelId,
}: {
  room: Room;
  hotelId: number;
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cartCount, updateCartCount } = useCartContext();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleRoomClick = (roomNumber: number) => {
    if (!isLoginModalOpen) {
      navigate(`/room/${roomNumber}`);
    }
  };
  const handleAddToCartButtonClick = (
    roomNumber: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (isLoggedIn() && !isSessionExpired()) {
      if (addRoomToCart({ hotelId, roomNumber }))
        updateCartCount(cartCount + 1);
    } else {
      openLoginModal();
    }
    console.log("room cart", getAllRoomsFromCart());
  };
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <div
      className={style.roomContainer}
      key={room.roomNumber}
      onClick={() => handleRoomClick(room.roomId)}
    >
      <div className={style.imageContainer}>
        <img
          src={room.roomPhotoUrl}
          alt={`Room ${room.roomNumber}`}
          className={style.roomImage}
        />
        <div className={style.roomPrice}>
          <b>${room.price}</b>
        </div>
      </div>
      <div className={style.roomInfoContainer}>
        <h3 className={style.roomNumber}>{room.roomNumber} room</h3>
        <p className={style.roomType}>{room.roomType} room</p>
        <div className={style.capacityContainer}>
          <GroupsIcon className={style.capacityIcon} />
          <p>
            {room.capacityOfAdults} Adults,
            {room.capacityOfChildren} Children.
          </p>
        </div>

        {room.availability && (
          <div className={style.smallButtonContainer}>
            <IconButton
              sx={{
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
              }}
              onClick={(e) => {
                handleAddToCartButtonClick(room.roomNumber, e);
              }}
              className={style.addToCartButton}
            >
              <AddShoppingCartIcon className={style.addToCartIcon} />
            </IconButton>
          </div>
        )}
      </div>
      {isLoginModalOpen && (
        <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      )}
    </div>
  );
}
