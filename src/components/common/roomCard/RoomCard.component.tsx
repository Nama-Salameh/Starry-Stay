import React, { useState, startTransition } from "react";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router";
import LoginModal from "../../modals/loginModal/LoginModal.component";
import localization from "../../../localizationConfig";
import style from "./RoomCard.module.css";
import { IconButton } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import GroupsIcon from "@mui/icons-material/Groups";
import { removeRoomFromCart } from "../../../utils/storageUtils/cartStorage/CartStorage";
import { useCartContext } from "../../../contexts/cartContext/CartContext.context";
import { isLoggedIn, isSessionExpired } from "../../../utils/TokenUtils";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

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
  }[];
};

export default function RoomCard({
  room,
  hotelId,
  isBooked = false,
}: {
  room: Room;
  hotelId: number;
  isBooked?: boolean;
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cartCount, handleAddToCart, updateCartCount } = useCartContext();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const handleRoomClick = (roomNumber: number) => {
    if (!isLoginModalOpen) {
      startTransition(() => {
        navigate(`/hotel/${hotelId}/room/${roomNumber}`);
      });
    }
  };
  const handleAddToCartButtonClick = (
    roomNumber: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    if (isLoggedIn() && !isSessionExpired()) {
      handleAddToCart(hotelId, roomNumber);
    } else {
      openLoginModal();
    }
  };
  const handleDeleteClick = (
    hotelId: number,
    roomNumber: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();

    removeRoomFromCart({ hotelId, roomNumber });
    updateCartCount(cartCount - 1);
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
        <h3 className={style.roomNumber}>
          {room.roomNumber} {localization.room}
        </h3>
        <p className={style.roomType}>
          {room.roomType} {localization.room}
        </p>
        <div className={style.capacityContainer}>
          <GroupsIcon className={style.capacityIcon} />
          <p>
            {room.capacityOfAdults} {localization.adults},
            {room.capacityOfChildren} {localization.children}.
          </p>
        </div>

        {room.availability && !isBooked && (
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
        {isBooked && (
          <div className={style.smallButtonContainer}>
            <IconButton
              sx={{
                color: theme.palette.secondary.main,
                backgroundColor: theme.palette.primary.main,
                borderRadius: 2,
              }}
              onClick={(e) => {
                handleDeleteClick(hotelId, room.roomNumber, e);
              }}
              className={style.deleteFromCartButton}
            >
              <RemoveShoppingCartIcon className={style.deleteFromCartIcon} />
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
