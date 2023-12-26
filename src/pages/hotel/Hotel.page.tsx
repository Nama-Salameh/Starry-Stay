import React, { useState, useEffect, useRef } from "react";
import localization from "../../localizationConfig";
import {
  getHotelInfoByItsId,
  getHotelGalleryByItsId,
  getHotelAmenitiesByItsId,
  getHotelRoomsByItsId,
  getHotelAvailableRoomsByItsId,
} from "../../services/hotels/Hotels.service";
import { useParams } from "react-router-dom";
import { Rating } from "@mui/material";
import style from "./Hotel.module.css";
import Map from "../../components/hotelComponents/mapContainer/MapContainer.component";
import HotelGallery from "../../components/hotelComponents/hotelGallery/HotelGallery.component";
import AvailableRoomContainer from "../../components/hotelComponents/availableRoomContainer/AvailableRoomContainer.component";
import HotelAmenitiesContainer from "../../components/hotelComponents/amenitiesContainer/HotelAmenitiesContainer.component";
import SmallButtonLoader from "../../components/common/loaders/SmallButtonLoaders.component";

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
  const [hotelRooms, setHotelRooms] = useState();

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
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotelsData();
  }, []);

  console.log("hotel Info is :", hotelInfo);
  console.log("hotel Gallery is :", hotelGallery);
  console.log("hotel amenities is : ", hotelAmenities);
  console.log("hotel Rooms is :", hotelRooms);
  const sanitizedRating = Math.max(0, Math.min(5, hotelInfo?.starRating || 0));

  return (
    <div className={style.hotelPageContainer}>
      <div className={style.gelleryContainer}>
        <HotelGallery hotelId={hotelId} />
      </div>

      <div className={style.hotelInfoContainer}>
        <div className={style.hoteInfo}>
          <h2>{hotelInfo?.hotelName}</h2>
          <Rating
            name="simple-controlled"
            value={sanitizedRating}
            readOnly
            size="large"
          />
          <p>{hotelInfo?.description}</p>
        </div>
        <Map
          latitude={hotelInfo?.latitude || 0}
          longitude={hotelInfo?.longitude || 0}
        />
      </div>
      <HotelAmenitiesContainer hotelId={hotelId} />
      <div className={style.roomsContainer}>
        <AvailableRoomContainer hotelId={hotelId} />
      </div>
    </div>
  );
}
