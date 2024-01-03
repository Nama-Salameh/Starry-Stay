import React, { useState, useEffect } from "react";
import { getRecentlyVisitedHotels } from "../../../services/home/home.service";
import { getDecodedToken } from "../../../utils/TokenUtils";
import Carousel from "../../common/carousel/Carousel.component";
import IToken from "../../../interfaces/IToken.interface";
import { Card } from "@mui/material";
import { Rating } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "../HomeComponents.module.css";
import localization from "../../../localizationConfig";
import slugify from "slugify";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.recentlyVisitedHotelsNotFound,
  unknown: localization.serverIssues,
};

export default function RecenlyVisitedHotels() {
  const [recentlyVisitedHotels, setRecentlyVisitedHotels] = useState<any[]>([]);
  const decodedToken: IToken | null = getDecodedToken() as IToken | null;
  const userIdString = decodedToken?.user_id || "";
  const userId = parseInt(userIdString, 10);
  const toSlug = (str: string) => slugify(str, { lower: true });

  useEffect(() => {
    const fetchRecentlyVisitedHotelsInfo = async () => {
      try {
        const hotelsInfo = await getRecentlyVisitedHotels(userId);
        setRecentlyVisitedHotels(hotelsInfo || []);
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

    fetchRecentlyVisitedHotelsInfo();
  }, []);

  console.log("recently : ", recentlyVisitedHotels);

  return (
    <div
      className={style.container}
      id={toSlug(localization.recentlyVisitedHotels)}
    >
      <h2>{localization.recentlyVisitedHotels}</h2>
      <Carousel>
        {recentlyVisitedHotels.map((hotel) => (
          <Card className={style.itemCard} key={hotel.hotelId}>
            <img
              src={hotel.thumbnailUrl}
              className={style.roomImage}
              alt={hotel.hotelName}
            />
            <div className={style.cardInfo}>
              <h3>{hotel.hotelName}</h3>
              <Rating value={hotel.starRating} readOnly />
              <p>
                <FontAwesomeIcon icon={faLocationDot} /> {hotel.cityName}
              </p>
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  );
}
