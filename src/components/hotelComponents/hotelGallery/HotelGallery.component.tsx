import React, { useState, useEffect } from "react";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { getHotelGalleryByItsId } from "../../../services/hotels/Hotels.service";
import style from './HotelGallery.module.css';

const HotelGallery = ({ hotelId }: { hotelId: number }) => {
  const [hotelGallery, setHotelGallery] = useState<
    { id: number; url: string }[]
  >([]);

  useEffect(() => {
    const fetchHotelsData = async () => {
      try {
        const hotelsGallery = await getHotelGalleryByItsId(hotelId);
        setHotelGallery(hotelsGallery || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotelsData();
  }, [hotelId]);

  const responsive = {
    0: { items: 1 },
    600: { items: 1 },
    1024: { items: 1 },
  };

  return (
    <div className={style.hotelGalleryContainer}>
      <AliceCarousel
        autoPlay
        autoPlayInterval={3000}
        responsive={responsive}
        infinite
        disableButtonsControls
      >
        {hotelGallery.map((image, index) => (
          <img key={index} src={image.url} className={style.hotelImage} alt={`Image ${index + 1}`} />
        ))}
      </AliceCarousel>
    </div>
  );
};

export default HotelGallery;
