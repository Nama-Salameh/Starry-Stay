import React, { useEffect, useState } from "react";
import StarRating from "./starRating/StarRating.component";
import CheckboxFiltering from "./checkbox/CheckboxFiltering.component";
import { CircularProgress, Divider } from "@mui/material";
import { getAmenitiesNames } from "../../services/aminities/Aminities.service";
import localization from "../../localizationConfig";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import style from "./FilteringContent.module.css";
import handleErrorType from "../../utils/handleErrorUtils/HnadleError.utils";

const errorMessages = {
  notFound: localization.amenitiesNotFound,
};

export default function FilteringContent() {
  const [amenitiesNames, setAmenitiesNames] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const names = await getAmenitiesNames();
        setAmenitiesNames(names || []);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.notFound,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>{localization.loading}</span>
        </div>
      )}
      {!isLoading && (
        <div>
          <h2>{localization.filterBy}</h2>
          <Divider />
          <StarRating />
          <Divider />
          <CheckboxFiltering
            items={amenitiesNames}
            title={localization.roomAmenities}
          />
          <Divider />
        </div>
      )}
    </div>
  );
}
