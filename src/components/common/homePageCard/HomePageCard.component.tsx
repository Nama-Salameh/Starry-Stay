import { Card, Rating } from "@mui/material";
import React from "react";
import style from "./HomePageCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function HotelHomeCard({
  info: {
    id,
    imageUrl,
    name,
    starRating,
    cityName,
    visitDate,
    priceLowerBound,
    priceUpperBound,
    cost,
    discountPercent,
  },
  onClick,
}: {
  info: {
    id: number;
    imageUrl: string;
    name: string;
    starRating?: number;
    cityName: string;
    visitDate?: any;
    priceLowerBound?: number;
    priceUpperBound?: number;
    cost?: number;
    discountPercent?: number;
  };
  onClick?: (id: number) => void;
}) {
  const formattedDate = visitDate
    ? new Date(visitDate).toLocaleDateString()
    : null;

  const handleCardClick = () => {
    {
      onClick && onClick(id);
    }
  };

  return (
    <Card className={style.itemCard} key={id} onClick={handleCardClick}>
      <div className={style.imageContainer}>
        {discountPercent && discountPercent && (
          <div className={style.discountPercent}>
            {Math.round(discountPercent * 100)}% OFF
          </div>
        )}
        <img src={imageUrl} className={style.image} alt={name} />
        <div className={style.costContainer}>
          {priceLowerBound && priceUpperBound && (
            <p className={style.costText}>
              ${priceLowerBound} - ${priceUpperBound}
            </p>
          )}
        </div>
      </div>
      <div className={style.cardInfo}>
        <h3>{name}</h3>
        {starRating && <Rating value={starRating} readOnly />}
        <p>
          <FontAwesomeIcon
            icon={faLocationDot}
            className={style.locationIcon}
          />
          {cityName}
        </p>
        {visitDate && <p>Visited at {formattedDate}</p>}
      </div>
    </Card>
  );
}
