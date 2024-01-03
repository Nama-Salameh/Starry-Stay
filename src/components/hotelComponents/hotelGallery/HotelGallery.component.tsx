import React, { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { getHotelGalleryByItsId } from "../../../services/hotels/Hotels.service";
import style from "./HotelGallery.module.css";
import localization from "../../../localizationConfig";
import { ErrorTypes } from "../../../enums/ErrprTypes.enum";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.hotelGalleryNotFound,
  unknown: localization.serverIssues,
};

const HotelGallery = ({ hotelId }: { hotelId: number }) => {
  const [hotelGallery, setHotelGallery] = useState<
    { id: number; url: string }[]
  >([]);

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const hotelsGallery = await getHotelGalleryByItsId(hotelId);
        setHotelGallery(hotelsGallery || []);
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
  }, [hotelId]);

  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 2 },
  };

  return (
    <div className={style.hotelGalleryContainer}>
      <AliceCarousel
        autoPlay
        autoPlayInterval={3000}
        responsive={responsive}
        infinite
        disableButtonsControls
        mouseTracking
      >
        {hotelGallery.map((image, index) => (
          <img
            key={index}
            src={image.url}
            className={style.hotelImage}
            alt={`Image ${index + 1}`}
          />
        ))}
      </AliceCarousel>
    </div>
  );
};

export default HotelGallery;
