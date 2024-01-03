import React, { useEffect, useState } from "react";
import localization from "../../localizationConfig";
import { getBooking } from "../../services/booking/Booking.service";
import {
  getAllRoomsFromCart,
  removeRoomFromCart,
} from "../../utils/storageUtils/cartStorage/CartStorage";
import {
  getHotelInfoByItsId,
  getHotelRoomsByItsId,
} from "../../services/hotels/Hotels.service";
import { getDecodedToken } from "../../utils/TokenUtils";
import style from "./BookedRooms.module.css";
import IToken from "../../interfaces/IToken.interface";
import SmallButton from "../../components/common/Buttons/SmallButton.component";
import { useTheme } from "@mui/system";
import { IconButton, useMediaQuery } from "@mui/material";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { useCartContext } from "../../contexts/cartContext/CartContext.context";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { ErrorTypes } from "../../enums/ErrprTypes.enum";
import { notifyError } from "../../utils/toastUtils/Toast.utils";

type HotelInfo = {
  hotelName: string;
  location: string;
  availableRooms: number;
  imageUrl: string;
  latitude: number;
  longitude: number;
  description: string;
  starRating: number;
  amenities: {
    name: string;
    description: string;
  };
};
type Room = {
  roomNumber: number;
  roomType: string;
  roomPhotoUrl: string;
  price: number;
  capacityOfAdults: number;
  capacityOfChildren: number;
  availability: boolean;
  roomAmenities: {
    name: string;
    description: string;
  }[];
};
type RoomInfo = {
  hotelId: number;
  hotelName: string;
  roomNumber: number;
  roomType: string;
  roomPhotoUrl: string;
  price: number;
  capacityOfAdults: number;
  capacityOfChildren: number;
  availability: boolean;
  roomAmenities: {
    name: string;
    description: string;
  }[];
};
type RoomDetails = {
  roomNumber: number;
  roomType: string;
  price: number;
  hotelName: string;
};

const errorMessages = {
  network: localization.networkError,
  notFound: localization.bookingRoomsNotFound,
  unknown: localization.serverIssues,
};


export default function BookedRooms({
  onRoomDetailsChange,
}: {
  onRoomDetailsChange: (details: RoomDetails[]) => void;
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:1300px)");
  const allRoomsFromCart = getAllRoomsFromCart();
  const [roomsInfo, setRoomsInfo] = useState<RoomInfo[]>([]);
  const userInfo: IToken = getDecodedToken() as IToken;
  console.log("user Info is ", userInfo);
  const { cartCount, updateCartCount } = useCartContext();
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const fetchRoomsInfo = async () => {
      try {
        let totalCost = 0;
        const roomDetails: RoomInfo[] = [];
        const getBook = await getBooking(+userInfo.user_id);
        console.log("getBook ", getBook);

        for (const room of allRoomsFromCart) {
          const hotelRooms = await getHotelRoomsByItsId(
            room.hotelId,
            "2024-1-1",
            "2024-1-30"
          );

          const matchingRoom = hotelRooms.find(
            (roomDetails: Room) => roomDetails.roomNumber === room.roomNumber
          );
          if (matchingRoom) {
            const hotelInfo: HotelInfo = await getHotelInfoByItsId(
              room.hotelId
            );

            roomDetails.push({
              hotelId: room.hotelId,
              hotelName: hotelInfo.hotelName,
              roomNumber: room.roomNumber,
              roomType: matchingRoom.roomType,
              roomPhotoUrl: matchingRoom.roomPhotoUrl,
              price: matchingRoom.price,
              capacityOfAdults: matchingRoom.capacityOfAdults,
              capacityOfChildren: matchingRoom.capacityOfChildren,
              availability: matchingRoom.availability,
              roomAmenities: matchingRoom.roomAmenities,
            });
            totalCost += matchingRoom.price;
          }
        }

        setRoomsInfo(roomDetails);
        setTotalCost(totalCost);
        onRoomDetailsChange(
          roomDetails.map(({ roomNumber, roomType, price, hotelName }) => ({
            roomNumber,
            roomType,
            price,
            hotelName,
          }))
        );
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.NotFound:
            notifyError(errorMessages.notFound);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
        }
      }
    };

    fetchRoomsInfo();
  }, [cartCount]);
  console.log("Updated room info:", roomsInfo);

  const handleDeleteClick = (hotelId: number, roomNumber: number) => {
    removeRoomFromCart({ hotelId, roomNumber });
    updateCartCount(cartCount - 1);
  };
  return (
    <div className={style.bookedRoomsContainer}>
      <div className={style.itemsContainer}>
        {roomsInfo.map((room, roomNumber) => (
          <div className={style.roomContainer}>
            <div className={style.roomImageContainer}>
              <img
                src={room.roomPhotoUrl}
                alt={`Room ${room.roomNumber}`}
                className={style.roomImage}
              />
              <div className={style.roomPrice}>{room.price}$</div>
            </div>
            <div className={style.roomInfoContainer}>
              <h3 className={style.roomNumber}>{room.roomNumber} room</h3>
              <p className={style.roomType}>{room.roomType} room</p>
              <p className={style.hotelName}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={style.locationIcon}
                />
                <b> {room.hotelName} </b>
              </p>

              <div className={style.capacityContainer}>
                <FontAwesomeIcon icon={faUsers} />
                <p className={style.capacity}>
                  <b>{room.capacityOfAdults} adults</b>
                </p>
                <p className={style.capacity}>
                  <b>{room.capacityOfChildren} Children </b>
                </p>
              </div>
              <div className={style.smallButtonContainer}>
                {isSmallScreen ? (
                  <IconButton
                    style={{
                      color: theme.palette.secondary.main,
                      backgroundColor: theme.palette.primary.main,
                      fontSize: 20,
                      borderRadius: 5,
                    }}
                  >
                    <div>
                      <RemoveShoppingCartIcon />
                    </div>
                  </IconButton>
                ) : (
                  <SmallButton
                    value={localization.deleteFromCart}
                    buttonWidth={160}
                    onClick={() =>
                      handleDeleteClick(room.hotelId, room.roomNumber)
                    }
                  />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={style.totalCostContainer}>
        {localization.totalCost} : {totalCost}$
      </div>
    </div>
  );
}
