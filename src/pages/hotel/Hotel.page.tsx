import React, { useState, useEffect, useRef } from "react";
import localization from "../../localizationConfig";
import {
  getHotelInfoByItsId,
  getHotelGalleryByItsId,
  getHotelAmenitiesByItsId,
  getHotelRoomsByItsId,
  getHotelAvailableRoomsByItsId,
  getHotelReviewsByItsId,
} from "../../services/hotels/Hotels.service";
import { useParams } from "react-router-dom";
import { Button, Rating } from "@mui/material";
import style from "./Hotel.module.css";
import Map from "../../components/hotelComponents/mapContainer/MapContainer.component";
import HotelAmenitiesContainer from "../../components/hotelComponents/amenitiesContainer/HotelAmenitiesContainer.component";
import SmallButtonLoader from "../../components/common/loaders/SmallButtonLoaders.component";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import { notifyError } from "../../utils/toastUtils/Toast.utils";
import ReviewsContainer from "../../components/hotelComponents/reviewsContainer/ReviewsContainer.component";
import Carousel from "../../components/common/carousel/Carousel.component";
import RoomContainer from "../../components/hotelComponents/roomsContainer/RoomsContainer.component";

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

const errorMessages = {
  network: localization.networkError,
  notFound: localization.hotelNotFound,
  unknown: localization.serverIssues,
};
const responsiveHotelImage = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 2050 },
    items: 6,
  },
  desktopLarge: {
    breakpoint: { max: 2050, min: 1810 },
    items: 5,
  },
  desktopMedium: {
    breakpoint: { max: 1810, min: 1450 },
    items: 4,
  },
  desktopSmall: {
    breakpoint: { max: 1450, min: 1060 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 850, min: 700 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
  },
};

const responsiveHotelImageMap = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
  },
  desktopLarge: {
    breakpoint: { max: 3000, min: 2300 },
    items: 5,
  },
  desktopMedium: {
    breakpoint: { max: 2300, min: 1820 },
    items: 4,
  },
  desktopSmall: {
    breakpoint: { max: 1820, min: 1400 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1400, min: 900 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 900, min: 0 },
    items: 1,
  },
};
export default function Hotel() {
  const params = useParams();
  const hotelIdString = params.hotelId;
  const hotelId: number = hotelIdString ? parseInt(hotelIdString, 10) : 0;

  const [hotelGallery, setHotelGallery] = useState<
    { id: number; url: string }[]
  >([]);
  const [hotelInfo, setHotelInfo] = useState<HotelInfo>();
  const [hotelAmenities, setHotelAmenities] =
    useState<{ id: number; name: string; description: string }[]>();
  const [hotelRooms, setHotelRooms] = useState<Room[]>([]);
  const [hotelAvailableRooms, setHotelAvailableRooms] = useState<Room[]>([]);
  const [hotelReviews, setHotelReviews] = useState<
    {
      reviewId: number;
      customerName: string;
      rating: number;
      description: string;
    }[]
  >([]);
  const [isMapVisible, setIsMapVisible] = useState(false);

  const toggleMapVisibility = () => {
    setIsMapVisible((prevVisibility) => !prevVisibility);
  };

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const hotelInfo = await getHotelInfoByItsId(hotelId);
        setHotelInfo(hotelInfo);

        const hotelsGallery = await getHotelGalleryByItsId(hotelId);
        setHotelGallery(hotelsGallery || []);

        const hotelAmenities = await getHotelAmenitiesByItsId(hotelId);
        setHotelAmenities(hotelAmenities || []);

        const hotelRooms = await getHotelRoomsByItsId(
          hotelId,
          "2024-1-1",
          "2024-1-30"
        );
        setHotelRooms(hotelRooms || []);

        const hotelAvailableRooms = await getHotelAvailableRoomsByItsId(
          hotelId,
          "2024-1-1",
          "2024-1-30"
        );
        setHotelAvailableRooms(hotelAvailableRooms || []);
        const hotelReviews = await getHotelReviewsByItsId(hotelId);
        setHotelReviews(hotelReviews || []);
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

    fetchHotelsData();
  }, []);

  console.log("hotel Info is :", hotelInfo);
  console.log("hotel Gallery is :", hotelGallery);
  console.log("hotel amenities is : ", hotelAmenities);
  console.log("hotel Rooms is :", hotelRooms);
  console.log("hotel reviews", hotelReviews);

  const sanitizedRating = Math.max(0, Math.min(5, hotelInfo?.starRating || 0));

  return (
    <div
      className={`${style.hotelPageContainer} ${
        isMapVisible ? "" : style.mapHidden
      }`}
    >
      {!isMapVisible && (
        <div className={style.mapButtonContainer}>
          <Button
            className={style.toggleMapButton}
            onClick={toggleMapVisibility}
            variant="outlined"
          >
            Show map
          </Button>
        </div>
      )}
      {isMapVisible && (
        <Map
          latitude={hotelInfo?.latitude || 0}
          longitude={hotelInfo?.longitude || 0}
          onClose={toggleMapVisibility}
        />
      )}
      <div className={style.hotelInfoContainer}>
        <img
          src={hotelInfo?.imageUrl}
          alt={hotelInfo?.hotelName}
          className={style.hotelImage}
        />
        <div className={style.hoteInfo}>
          <h2 className={style.hotelName}>{hotelInfo?.hotelName}</h2>
          <Rating
            name="simple-controlled"
            value={sanitizedRating}
            readOnly
            size="medium"
          />
          <h4>{hotelInfo?.location}</h4>
        </div>
      </div>
      <h3>Hotel details</h3>
      <div className={style.hotelDetails}>
        <Carousel
          responsive={
            !isMapVisible ? responsiveHotelImage : responsiveHotelImageMap
          }
        >
          {hotelGallery.map((image, index) => (
            <img
              key={index}
              src={image.url}
              className={style.hotelGalleryImage}
              alt={`Image ${index + 1}`}
            />
          ))}
        </Carousel>

        <p>{hotelInfo?.description}</p>

        <HotelAmenitiesContainer hotelId={hotelId} />
        <h2>{localization.Rooms}</h2>
        <RoomContainer hotelRooms={hotelRooms} hotelId={hotelId} />
        <h2>{localization.availableRooms}</h2>
        <RoomContainer hotelRooms={hotelAvailableRooms} hotelId={hotelId} />
        <ReviewsContainer hotelId={hotelId} />
      </div>
    </div>
  );
}
