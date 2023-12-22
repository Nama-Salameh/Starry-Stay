import React, { useEffect, useState } from "react";
import { getFeaturedDealsHotels } from "../../../services/home/home.service";
import { Rating } from "@mui/material";
import { Grid , Card} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "./HotelsContainer.module.css";

export default function HotelsContainer() {
  const [featuredDealsHotels, setFeaturedDealsHotels] = useState<
    {
      cityName: string;
      description: string;
      discount: number;
      finalPrice: number;
      hotelName: string;
      hotelStarRating: number;
      originalRoomPrice: number;
      roomPhotoUrl: string;
      title: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchHotelsInfo = async () => {
      try {
        const hotelsInfo = await getFeaturedDealsHotels();
        setFeaturedDealsHotels(hotelsInfo || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchHotelsInfo();
  }, []);

  console.log(featuredDealsHotels);

  return (
    <Grid container spacing={2} className={style.container}>
      {featuredDealsHotels.map((item) => (
        <Card className={style.itemGrid}>
          <img src={item.roomPhotoUrl} className={style.roomImage} />
          <h3>{item.title}</h3>
          <Rating value={item.hotelStarRating} />
          <p>
            <FontAwesomeIcon icon={faLocationDot} /> {item.cityName}
          </p>
          <p>
            <b>$</b>
            {item.finalPrice}
          </p>
          <p>
            <b>$</b>
            {item.originalRoomPrice}
          </p>
        </Card>
      ))}
    </Grid>
  );
}
