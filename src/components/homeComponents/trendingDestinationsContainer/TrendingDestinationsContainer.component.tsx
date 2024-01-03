import React, { useState, useEffect } from "react";
import { getTrendingDestinations } from "../../../services/home/home.service";
import Carousel from "../../common/carousel/Carousel.component";
import { Card } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "../HomeComponents.module.css";
import localization from "../../../localizationConfig";
import slugify from "slugify";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.trendingDestinationsNotFound,
  unknown: localization.serverIssues,
};

export default function TrendingDestinationsContainer() {
  const [trendingDestinations, setTrendingDestinations] = useState<any[]>([]);
  const toSlug = (str: string) => slugify(str, { lower: true });

  useEffect(() => {
    const fetchTrendingDestinationsInfo = async () => {
      try {
        const trendingDestinationInfo = await getTrendingDestinations();
        setTrendingDestinations(trendingDestinationInfo || []);
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

    fetchTrendingDestinationsInfo();
  }, []);

  return (
    <div
      className={style.container}
      id={toSlug(localization.trendingDestinations)}
    >
      <h2>{localization.trendingDestinations}</h2>
      <Carousel>
        {trendingDestinations.map((distination) => (
          <Card className={style.itemCard} key={distination.cityId}>
            <img
              src={distination.thumbnailUrl}
              className={style.roomImage}
              alt={distination.cityName}
            />
            <div className={style.cardInfo}>
              <h3>{distination.cityName}</h3>
              <p>
                <FontAwesomeIcon icon={faLocationDot} />{" "}
                {distination.countryName}
              </p>
            </div>
          </Card>
        ))}
      </Carousel>
    </div>
  );
}
