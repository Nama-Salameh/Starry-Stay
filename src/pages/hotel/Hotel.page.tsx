import React, { useState, useEffect } from "react";
import localization from "../../localizationConfig";
import {
  getHotelInfoByItsId,
  getHotelGalleryByItsId,
  getHotelAmenitiesByItsId,
} from "../../services/hotels/Hotels.service";
import { useParams } from "react-router-dom";
import IHotel from "../../interfaces/IHotel.interface";

export default function Hotel() {
  const params = useParams();
  const hotelIdString = params.hotelId;
  const hotelId: number = hotelIdString ? parseInt(hotelIdString, 10) : 0;

  const [hotelGallery, setHotelGallery] = useState<
    { id: number; url: string }[]
  >([]);
  const [hotelInfo, setHotelInfo] = useState<IHotel>();
  const [hotelAmenities, setHotelAmenities] =
    useState<{ id: number; name: string; description: string }[]>();
  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const hotelInfo = await getHotelInfoByItsId(hotelId);
        setHotelInfo(hotelInfo || {});

        const hotelsGallery = await getHotelGalleryByItsId(hotelId);
        setHotelGallery(hotelsGallery || []);

        const hotelAmenities = await getHotelAmenitiesByItsId(hotelId);
        setHotelAmenities(hotelAmenities || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotelsData();
  }, []);

  console.log("hotel Info is :", hotelInfo);
  console.log("hotel Gallery is :", hotelGallery);
  console.log("hotel amenities is : ", hotelAmenities);

  return (
    <div>
      {localization.hotel}
      {hotelGallery.map((hotel) => (
        <img src={hotel.url} alt={`Hotel ${hotel.id}`} />
      ))}
    </div>
  );
}
