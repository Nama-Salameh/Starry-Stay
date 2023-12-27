import React, { useEffect, useState } from "react";
import localization from "../../localizationConfig";
import { getBooking } from "../../services/booking/Booking.service";
import { getAllRoomsFromCart } from "../../utils/storageUtils/cartStorage/CartStorage";
import { getHotelRoomsByItsId } from "../../services/hotels/Hotels.service";
import { getDecodedToken } from "../../utils/TokenUtils";
import style from "./Checkout.module.css";
import IToken from "../../interfaces/IToken.interface";

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

export default function Checkout() {
  const allRoomsFromCart = getAllRoomsFromCart();
  const [roomsInfo, setRoomsInfo] = useState<RoomInfo[]>([]);
  const userInfo: IToken = getDecodedToken() as IToken;
  console.log("user Info is ", userInfo);

  const getBook = getBooking(+userInfo.user_id);
  console.log("getBook ", getBook);

  useEffect(() => {
    const fetchRoomsInfo = async () => {
      try {
        const roomDetails: RoomInfo[] = [];

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
            roomDetails.push({
              hotelId: room.hotelId,
              roomNumber: room.roomNumber,
              roomType: matchingRoom.roomType,
              roomPhotoUrl: matchingRoom.roomPhotoUrl,
              price: matchingRoom.price,
              capacityOfAdults: matchingRoom.capacityOfAdults,
              capacityOfChildren: matchingRoom.capacityOfChildren,
              availability: matchingRoom.availability,
              roomAmenities: matchingRoom.roomAmenities,
            });
          }
        }
        setRoomsInfo(roomDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRoomsInfo();
  }, []);
  console.log("Updated room info:", roomsInfo);

  return (
    <div>
      <div className={style.itemsContainer}></div>
      <div className={style.personalInfoContainer}></div>
    </div>
  );
}
