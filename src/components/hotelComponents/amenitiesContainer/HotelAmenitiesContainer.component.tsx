import React, { useState, useEffect } from "react";
import Carousel from "../../common/carousel/Carousel.component";
import { getHotelInfoByItsId } from "../../../services/hotels/Hotels.service";
import style from "./HotelAmenityContainer.module.css";
import { Card } from "@mui/material";
import localization from "../../../localizationConfig";
import { ErrorTypes } from "../../../enums/ErrprTypes.enum";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.hotelNotFound,
  unknown: localization.serverIssues,
};

export default function HotelAmenitiesContainer({
  hotelId,
}: {
  hotelId: number;
}) {
  const [hotelAmenities, setHotelAmenities] = useState<
    { name: string; description: string }[]
  >([]);
  useEffect(() => {
    const fetchHotelAmenities = async () => {
      try {
        const hotelInfo = await getHotelInfoByItsId(hotelId);
        console.log("hotelInfo", hotelInfo);
        setHotelAmenities(hotelInfo.amenities || []);
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

    fetchHotelAmenities();
  }, []);
  console.log("hotel amenities in hotel is : ", hotelAmenities);

  return (
    <div className={style.container}>
      <h2>{localization.hotelAmenities}</h2>
      <Carousel>
        {hotelAmenities.map((amenity, index) => (
          <div key={index} className={style.item}>
            <h3>{amenity.name}</h3>
            <p>{amenity.description}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
