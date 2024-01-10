import React, { startTransition } from "react";
import Carousel from "../../common/carousel/Carousel.component";
import style from "../HomeComponents.module.css";
import localization from "../../../localizationConfig";
import slugify from "slugify";
import HotelHomeCard from "../../common/homePageCard/HomePageCard.component";
import { useNavigate } from "react-router-dom";
import { NumberSchema } from "yup";

export default function FeaturedDealsHotelsContainer({
  featuredDeals,
}: {
  featuredDeals: any[];
}) {
  const navigate = useNavigate();
  const toSlug = (str: string) => slugify(str, { lower: true });
  
  const handleRoomClick = (hotelId: number) => {
   
  };
  return (
    <div className={style.container}>
      <h2 id={toSlug(localization.featuredDeals)}>
        {localization.featuredDeals}
      </h2>
      <Carousel>
        {featuredDeals.map((room: any) => (
          <HotelHomeCard
            info={{
              id: room.hoteld,
              name: room.title,
              imageUrl: room.roomPhotoUrl,
              starRating: room.hotelStarRating,
              cityName: room.cityName,
            }}
            onClick={handleRoomClick}
          />
        ))}
      </Carousel>
    </div>
  );
}
