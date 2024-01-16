import React, { startTransition } from "react";
import Carousel from "../../common/carousel/Carousel.component";
import style from "../HomeComponents.module.css";
import localization from "../../../localizationConfig";
import slugify from "slugify";
import HotelHomeCard from "../../common/homePageCard/HomePageCard.component";
import { useNavigate } from "react-router-dom";

type City = {
  cityId: number;
  cityName: string;
  countryName: string;
  thumbnailUrl: string;
};
export default function TrendingDestinationsContainer({
  trendingDestinations,
}: {
  trendingDestinations: City[];
}) {
  const navigate = useNavigate();
  const toSlug = (str: string) => slugify(str, { lower: true });

  const handleCityClick = (cityId: number) => {
    startTransition(() => {
      navigate(`/city/${cityId}`);
    });
  };

  return (
    <div
      className={style.container}
      id={toSlug(localization.trendingDestinations)}
    >
      <h2>{localization.trendingDestinations}</h2>
      {
        <Carousel>
          {trendingDestinations.map((distination: any) => (
            <HotelHomeCard
              info={{
                id: distination.cityId,
                imageUrl: distination.thumbnailUrl,
                name: distination.cityName,
                cityName: distination.countryName,
              }}
              onClick={handleCityClick}
            />
          ))}
        </Carousel>
      }
    </div>
  );
}
