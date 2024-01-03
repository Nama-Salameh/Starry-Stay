import React, { useEffect, useState } from "react";
import StarRating from "./starRating/StarRating.component";
import CheckboxFiltering from "./checkbox/CheckboxFiltering.component";
import { Divider } from "@mui/material";
import { getAmenitiesNames } from "../../services/aminities/Aminities.service";
import localization from "../../localizationConfig";
import { notifyError } from "../../utils/toastUtils/Toast.utils";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.amenitiesNotFound,
  unknown: localization.serverIssues,
};

export default function FilteringContent() {
  const [amenitiesNames, setAmenitiesNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const names = await getAmenitiesNames();
        setAmenitiesNames(names || []);
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

    fetchData();
  }, []);

  return (
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
  );
}
