import React, { useState, useEffect } from "react";
import { getHotelInfoByItsId } from "../../../services/hotels/Hotels.service";
import style from "./HotelAmenityContainer.module.css";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import AmenityDialog from "../../dialogs/amenitiesDialog/AmenitiesDialog.component"; // Import your new component
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";
import localization from "../../../localizationConfig";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";

const errorMessages = {
  network: "Network Error",
  notFound: "Hotel Not Found",
  unknown: "Server Issues",
};

const amenityIcons: Record<string, JSX.Element | undefined> = {
  "Free Wi-Fi": <WifiIcon className={style.icon} />,
  "Air Conditioning": <AcUnitIcon className={style.icon} />,
  "Mini Bar": <LocalBarIcon className={style.icon} />,
  "Swimming Pool": <PoolIcon className={style.icon} />,
  "Fitness Center": <FitnessCenterIcon className={style.icon} />,
};

export default function HotelAmenitiesContainer({
  hotelId,
}: {
  hotelId: number;
}) {
  const [hotelAmenities, setHotelAmenities] = useState<
    { name: string; description: string }[]
  >([]);
  const [openReviewsDialog, setOpenReviewsDialog] = useState(false);

  useEffect(() => {
    const fetchHotelAmenities = async () => {
      try {
        const hotelInfo = await getHotelInfoByItsId(hotelId);
        setHotelAmenities(hotelInfo.amenities || []);
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

    fetchHotelAmenities();
  }, [hotelId]);

  const handleOpenReviewsDialog = () => {
    setOpenReviewsDialog(true);
  };

  const handleCloseReviewsDialog = () => {
    setOpenReviewsDialog(false);
  };

  return (
    <div className={style.container}>
      <div className={style.amenitiesContainer}>
        {hotelAmenities.map((amenity, index) => (
          <div key={index} className={style.item}>
            <span>
              {amenityIcons[amenity.name] || (
                <CheckCircleOutlineIcon className={style.icon} />
              )}
            </span>
            <h6>{amenity.name}</h6>
          </div>
        ))}
      </div>

      <Button
        variant="outlined"
        onClick={handleOpenReviewsDialog}
        className={style.amenitiesButton}
      >
        {localization.seeAmenititesDetails}
      </Button>

      <AmenityDialog
        open={openReviewsDialog}
        handleClose={handleCloseReviewsDialog}
        amenities={hotelAmenities}
      />
    </div>
  );
}
