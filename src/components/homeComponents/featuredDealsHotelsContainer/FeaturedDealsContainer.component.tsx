import React, { useEffect, useState } from "react";
import { getFeaturedDealsHotels } from "../../../services/home/home.service";
import Carousel from "../../common/carousel/Carousel.component";
import { Rating } from "@mui/material";
import { Card } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "../HomeComponents.module.css";
import localization from "../../../localizationConfig";
import slugify from "slugify";
import { ErrorTypes } from "../../../enums/ErrprTypes.enum";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.featuredDealsNotFound,
  unknown: localization.serverIssues,
};

export default function FeaturedDealsHotelsContainer() {
  const [featuredDealsHotels, setFeaturedDealsHotels] = useState<any[]>([]);

  useEffect(() => {
    const fetchHotelsInfo = async () => {
      try {
        const hotelsInfo = await getFeaturedDealsHotels();
        setFeaturedDealsHotels(hotelsInfo || []);
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

    fetchHotelsInfo();
  }, []);

  console.log(featuredDealsHotels);
  const toSlug = (str: string) => slugify(str, { lower: true });

  return (
    <div className={style.container}>
      <h2 id={toSlug(localization.featuredDeals)}>
        {localization.featuredDeals}
      </h2>
      <Carousel>
        {featuredDealsHotels.map((hotel) => (
          <Card className={style.itemCard} key={hotel.hotelId}>
            <div className={style.discountPercentage}>
              {(hotel.discount * 100).toFixed(0)}%
            </div>

            <img
              src={hotel.roomPhotoUrl}
              className={style.roomImage}
              alt={hotel.hotelName}
            />
            <div className={style.cardInfo}>
              <h3>{hotel.hotelName}</h3>
              <Rating value={hotel.hotelStarRating} readOnly />
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {hotel.cityName}
              </p>
              <div className={style.priceInfo}>
                <p>
                  <b>$</b>
                  {hotel.finalPrice}
                </p>
                <p>
                  <b>$</b>
                  <s>{hotel.originalRoomPrice}</s>
                </p>
              </div>
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  );
}
