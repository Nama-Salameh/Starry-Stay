import React, { startTransition, useEffect, useState } from "react";
import { Button, CircularProgress, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router";
import { createBrowserHistory } from "history";
import {
  getBooking,
  postBooking,
} from "../../services/booking/Booking.service";
import { getDecodedToken } from "../../utils/TokenUtils";
import { getAllRoomsFromCart } from "../../utils/storageUtils/cartStorage/CartStorage";
import { useCartContext } from "../../contexts/cartContext/CartContext.context";
import {
  getHotelInfoByItsId,
  getHotelRoomsByItsId,
} from "../../services/hotels/Hotels.service";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import style from "./Checkout.module.css";
import IToken from "../../interfaces/IToken.interface";
import localization from "../../localizationConfig";
import RoomCard from "../../components/common/roomCard/RoomCard.component";
import PersonalInfo from "../../components/checkoutComponents/personalInfoContainer/PersonalInfoContainer.component";
import handleErrorType from "../../utils/handleErrorUtils/HnadleError.utils";

type RoomInfo = {
  hotelId: number;
  hotelName: string;
  roomId: number;
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
  }[];
};

type Room = {
  roomId: number;
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

const errorMessages = {
  conflict: localization.conflictBookingError,
  notFound: localization.bookingRoomsNotFound,
};

export default function Checkout() {
  const isSmallScreen = useMediaQuery("(max-width:650px)");
  const navigate = useNavigate();
  const userInfo: IToken = getDecodedToken() as IToken;
  const allRoomsFromCart = getAllRoomsFromCart();
  const { cartCount } = useCartContext();
  const [roomsInfo, setRoomsInfo] = useState<RoomInfo[]>([]);
  const [totalCost, setTotalCost] = useState(0);
  const [selectedRooms, setSelectedRooms] = useState<RoomDetails[]>([]);
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const history = createBrowserHistory();

  useEffect(() => {
    document.title = localization.checkoutPageTitle;
  });

  useEffect(() => {
    const fetchRoomsInfo = async () => {
      try {
        let totalCost = 0;
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
            const hotelInfo: HotelInfo = await getHotelInfoByItsId(
              room.hotelId
            );

            roomDetails.push({
              hotelId: room.hotelId,
              hotelName: hotelInfo.hotelName,
              roomId: matchingRoom.roomId,
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
        handleRoomDetailsChange(
          roomDetails.map(({ roomNumber, roomType, price, hotelName }) => ({
            roomNumber,
            roomType,
            price,
            hotelName,
          }))
        );
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.notFound,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomsInfo();
  }, [cartCount]);

  const handleRoomDetailsChange = (details: RoomDetails[]) => {
    setSelectedRooms(details);
  };

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    try {
      setIsConfirmLoading(true);
      let confirmationNumber = "";
      for (const room of selectedRooms) {
        const bookingDateTime = new Date();
        const bookingStatus = "Confirmed";
        const bookingInfo = await postBooking(
          `${userInfo.given_name} ${userInfo.family_name}`,
          room.hotelName,
          room.roomNumber.toString(),
          room.roomType,
          bookingDateTime,
          room.price,
          values.paymentMethod,
          bookingStatus
        );
        confirmationNumber = bookingInfo?.confirmationNumber || "";
      }
      startTransition(() => navigate(`/confirmation/${confirmationNumber}`));
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        conflict: errorMessages.conflict,
      });
    } finally {
      setIsConfirmLoading(false);
      resetForm();
    }
  };

  const handleGoBack = () => {
    history.back();
  };

  return (
    <div className={style.pageContainer}>
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>{localization.loading}</span>
        </div>
      )}
      {!isLoading && (
        <Button
          variant="outlined"
          className={style.backButton}
          onClick={handleGoBack}
        >
          &lt; {localization.back}
        </Button>
      )}
      <div className={style.checkoutPageContainer}>
        {!isLoading && (
          <div>
            <div className={style.bookedRoomsContainer}>
              <h2>{localization.bookedRooms}</h2>
              {roomsInfo.map((room) => (
                <RoomCard
                  key={room.roomId}
                  room={room}
                  hotelId={room.hotelId}
                  isBooked={true}
                />
              ))}
              <h4 className={style.totalCost}>
                {localization.totalCost}: {totalCost}$
              </h4>
            </div>
            <div className={style.personalInfoContainer}>
              <PersonalInfo
                userInfo={{
                  givenName: userInfo.given_name,
                  familyName: userInfo.family_name,
                }}
                onSubmit={handleFormSubmit}
                isConfirmLoading={isConfirmLoading}
                isSmallScreen={isSmallScreen}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
