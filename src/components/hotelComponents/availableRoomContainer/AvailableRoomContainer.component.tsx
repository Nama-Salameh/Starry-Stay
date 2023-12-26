import React, { useEffect, useState, startTransition } from "react";
import { useNavigate } from "react-router";
import { getHotelAvailableRoomsByItsId } from "../../../services/hotels/Hotels.service";
import { useTheme } from "@mui/system";
import style from "./AvailableRoomContainer.module.css";
import localization from "../../../localizationConfig";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { IconButton, useMediaQuery } from "@mui/material";
import SmallButton from "../../common/Buttons/SmallButton.component";
import {
  RemoveAllRoomsFromCart,
  addRoomToCart,
  getAllRoomsFromCart,
} from "../../../utils/storageUtils/cartStorage/CartStorage";
import { useCartContext } from "../../../contexts/cartContext/CartContext.context";

type AvailalbeRoom = {
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

export default function RoomContainer({ hotelId }: { hotelId: number }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const { cartCount, updateCartCount } = useCartContext();
  const isSmallScreen = useMediaQuery("(max-width:1100px)");

  const handleRoomClick = (roomNumber: number) => {
    navigate(`/room/${roomNumber}`);
  };

  const [hotelAvailableRooms, setHotelAvaiableRooms] = useState<
    AvailalbeRoom[]
  >([]);

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const hotelAvailableRooms = await getHotelAvailableRoomsByItsId(
          hotelId,
          "2024-1-1",
          "2024-1-30"
        );
        setHotelAvaiableRooms(hotelAvailableRooms || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotelsData();
  }, [hotelId]);

  console.log("hotel Available rooms is :", hotelAvailableRooms);

  const handleAddToCartButtonClick = (
    roomNumber: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    if (addRoomToCart({ hotelId, roomNumber })) updateCartCount(cartCount + 1);
    console.log("room cart", getAllRoomsFromCart());
  };

  //RemoveAllRoomsFromCart();
  return (
    <div>
      <h2>{localization.availableRooms}</h2>
      <div className={style.roomContainerWrapper}>
        {Array.isArray(hotelAvailableRooms) &&
          hotelAvailableRooms.map((room) => (
            <div
              className={style.roomContainer}
              key={room.roomNumber}
              onClick={() => handleRoomClick(room.roomNumber)}
            >
              <img
                src={room.roomPhotoUrl}
                alt={`Room ${room.roomNumber}`}
                className={style.roomImage}
              />
              <div className={style.roomInfoContainer}>
                <h3 className={style.roomNumber}>{room.roomNumber}</h3>
                <p className={style.roomType}>{room.roomType} room</p>

                <p className={style.roomPrice}>
                  <b>${room.price}</b>
                </p>
                <div className={style.smallButtonContainer}>
                  {!isSmallScreen ? (
                    <SmallButton
                      value={localization.addToCart}
                      icon={
                        <AddShoppingCartIcon className={style.addToCartIcon} />
                      }
                      onClick={(e) => {
                        handleAddToCartButtonClick(room.roomNumber, e);
                      }}
                    />
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
