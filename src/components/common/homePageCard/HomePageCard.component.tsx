import { Card, Rating } from "@mui/material";
import React from "react";
import style from "./HomePageCard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

export default function HotelHomeCard({
  info: { id, imageUrl, name, starRating, cityName, visitDate },
  onClick,
}: {
  info: {
    id: number;
    imageUrl: string;
    name: string;
    starRating?: number;
    cityName: string;
    visitDate?:any;
  };
  onClick: (id: number) => void;
}) {
  const formattedDate = visitDate ? new Date(visitDate).toLocaleDateString() : null;

  const handleCardClick = () => {
    onClick(id);
  };

  return (
    <Card className={style.itemCard} key={id} onClick={handleCardClick}>
      <img src={imageUrl} className={style.image} alt={name} />
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
