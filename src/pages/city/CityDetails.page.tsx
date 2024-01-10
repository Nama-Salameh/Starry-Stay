import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { notifyError } from "../../utils/toastUtils/Toast.utils";
import {
  getCityByItsId,
  getCityHotels,
  getCityPhotos,
} from "../../services/cities/Cities.service";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import localization from "../../localizationConfig";
import { Button, CircularProgress } from "@mui/material";
import style from "./CityDetails.module.css";
import Carousel from "../../components/common/carousel/Carousel.component";
import HotelCard from "../../components/common/hotelCard/HotelCard.component";
import { createBrowserHistory } from "history";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.hotelNotFound,
  unknown: localization.serverIssues,
  timeout: localization.cityDetailsTimedout,
};

type City = { id: number; name: string; description: string };
type CityHotel = {
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
};
type CityPhoto = {
  id: number;
  url: string;
};

const responsive = {
  allScreens: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
    centerPadding: 0,
    custom: {
      width: 1500,
      height: 600,
    },
  },
};

export default function CityDetails() {
  const params = useParams();
  const cityIdString = params.cityId;
  const cityId: number = cityIdString ? parseInt(cityIdString, 10) : 0;
  const [cityInfo, setCityInfo] = useState<City>();
  const [cityHotels, setCityHotels] = useState<CityHotel[]>();
  const [cityPhotos, setCityPhotos] = useState<CityPhoto[]>();
  const [isLoading, setIsLoading] = useState(true);
  const history = createBrowserHistory();

  useEffect(() => {
    document.title = localization.cityPageTitle;
  });

  useEffect(() => {
    const fetchCitysData = async () => {
      try {
        const cityInfo = await getCityByItsId(cityId);
        setCityInfo(cityInfo);

        const cityHotelInfo = await getCityHotels(cityId);
        setCityHotels(cityHotelInfo);
        const cityPhotos = await getCityPhotos(cityId);
        setCityPhotos(cityPhotos);
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
          case ErrorTypes.Timeout:
            notifyError(errorMessages.timeout);
            break;
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCitysData();
  }, []);

  const handleGoBack = () => {
    history.back();
  };
  return (
    <div className={style.pageContainer}>
      {!isLoading && (
        <Button
          variant="outlined"
          className={style.backButton}
          onClick={handleGoBack}
        >
          &lt; {localization.back}
        </Button>
      )}
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>{localization.loading}</span>
        </div>
      )}
      <div className={style.cityPageContainer}>
        {!isLoading && (
          <div>
            {cityPhotos && (
              <div className={style.carosuselContainer}>
                <Carousel responsive={responsive}>
                  {cityPhotos?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      className={style.cityGalleryImage}
                      alt={`Image ${cityInfo?.name}`}
                    />
                  ))}
                </Carousel>
              </div>
            )}
            <div>
              <h2 className={style.cityName}>{cityInfo?.name}</h2>
              <p>{cityInfo?.description}</p>
            </div>
            <div className={style.cityHotels}>
              <h2>{localization.cityHotels}</h2>
              <div className={style.hotelCardContainer}>
                {cityHotels?.map((hotel) => (
                  <HotelCard hotelId={hotel.id} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
