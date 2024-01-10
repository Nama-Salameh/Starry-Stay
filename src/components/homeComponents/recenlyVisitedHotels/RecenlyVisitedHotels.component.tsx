import React, { startTransition } from "react";
import Carousel from "../../common/carousel/Carousel.component";
import style from "../HomeComponents.module.css";
import localization from "../../../localizationConfig";
import slugify from "slugify";
import HotelHomeCard from "../../common/homePageCard/HomePageCard.component";
import { useNavigate } from "react-router-dom";

type recentlyVisitedHotel = {
  hotelId: number;
  hotelName: string;
  cityName: string;
  thumbnailUrl: string;
  starRating: number;
  visitDate:Date;
};

export default function RecenlyVisitedHotels({
  recentlyVisitedHotels,
}: {
  recentlyVisitedHotels: recentlyVisitedHotel[];
}) {
  const navigate = useNavigate();
  const toSlug = (str: string) => slugify(str, { lower: true });

  const handleHotelClick = (hotelId: number) => {
    startTransition(() => {
      navigate(`/hotel/${hotelId}`);
    });
  };
  return (
    <div
      className={style.container}
      id={toSlug(localization.recentlyVisitedHotels)}
    >
      <h2>{localization.recentlyVisitedHotels}</h2>
      <Carousel>
        {recentlyVisitedHotels.map((hotel: any) => (
          <HotelHomeCard
            info={{
              id: hotel.hotelId,
              imageUrl: hotel.thumbnailUrl,
              name: hotel.hotelName,
              cityName: hotel.cityName,
              starRating: hotel.starRating,
              visitDate: hotel.visitDate,
            }}
            onClick={handleHotelClick}
          />
        ))}
      </Carousel>
    </div>
  );
}
