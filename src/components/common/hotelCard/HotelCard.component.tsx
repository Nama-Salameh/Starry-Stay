import React, { startTransition, useEffect, useState } from "react";
import { getHotelInfoByItsId } from "../../../services/hotels/Hotels.service";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import localization from "../../../localizationConfig";
import style from "./HotelCard.module.css";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import AmenitiesContainer from "../amenitiesContainer/AmenitiesContainer.component";
import handleErrorType from "../../../utils/handleErrorUtils/HnadleError.utils";

const errorMessages = {
  notFound: localization.hotelNotFound,
};
type Hotel = {
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: {
    name: string;
    description: string;
  }[];
  starRating: number;
  availableRooms: number;
  imageUrl: string;
  cityId: number;
};
export default function HotelCard({ hotelId }: { hotelId: number }) {
  const navigate = useNavigate();
  const [hotelInfo, setHotelInfo] = useState<Hotel>();

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const hotelInfo = await getHotelInfoByItsId(hotelId);
        setHotelInfo(hotelInfo);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.notFound,
        });
      }
    };

    fetchHotelsData();
  }, []);

  const handleHotelClick = (hotelId: number) => {
    startTransition(() => {
      navigate(`/hotel/${hotelId}`);
    });
  };
  return (
    <div
      className={style.hotelContainer}
      key={hotelId}
      onClick={() => handleHotelClick(hotelId)}
    >
      <img
        src={hotelInfo?.imageUrl}
        alt={`Hotel ${hotelInfo?.hotelName}`}
        className={style.hotelImage}
      />
      <div className={style.hotelInfoContainer}>
        <h2>{hotelInfo?.hotelName}</h2>
        <h4 className={style.hotelLocation}>{hotelInfo?.location}</h4>

        {hotelInfo && (
          <Rating
            value={hotelInfo?.starRating}
            readOnly
            className={style.hotelRating}
          />
        )}

        <div className={style.amenitiesContainer}>
          {hotelInfo?.amenities && (
            <AmenitiesContainer
              amenities={hotelInfo?.amenities}
              isHotelCard={true}
            />
          )}
        </div>
      </div>
    </div>
  );
}
