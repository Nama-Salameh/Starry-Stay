import React, { useState } from "react";
import style from "./AmenitiesContainer.module.css";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Button from "@mui/material/Button";
import AmenityDialog from "../../dialogs/amenitiesDialog/AmenitiesDialog.component"; // Import your new component
import localization from "../../../localizationConfig";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import HotTubIcon from "@mui/icons-material/HotTub";
import WaterIcon from "@mui/icons-material/Water";
import TvIcon from "@mui/icons-material/Tv";
import BedIcon from "@mui/icons-material/Bed";
import RoomServiceIcon from "@mui/icons-material/RoomService";

const amenityIcons: Record<string, JSX.Element | undefined> = {
  "Free Wi-Fi": <WifiIcon className={style.icon} />,
  "Air Conditioning": <AcUnitIcon className={style.icon} />,
  "Mini Bar": <LocalBarIcon className={style.icon} />,
  "Swimming Pool": <PoolIcon className={style.icon} />,
  "Fitness Center": <FitnessCenterIcon className={style.icon} />,
  Jacuzzi: <HotTubIcon className={style.icon} />,
  "Ocean View": <WaterIcon className={style.icon} />,
  TV: <TvIcon className={style.icon} />,
  "King Size Bed": <BedIcon className={style.icon} />,
  "Room Service": <RoomServiceIcon className={style.icon} />,
};

export default function AmenitiesContainer({
  amenities,
  isHotelCard = false,
}: {
  amenities: {
    id?: number;
    name: string;
    description: string;
  }[];
  isHotelCard?: boolean;
}) {
  const [openAmenitiessDialog, setOpenAmenitiesDialog] = useState(false);

  const handleOpenAmenitiesDialog = () => {
    setOpenAmenitiesDialog(true);
  };

  const handleCloseAmenitiesDialog = () => {
    setOpenAmenitiesDialog(false);
  };

  return (
    <div className={style.container}>
      <div className={style.amenitiesContainer}>
        {isHotelCard
          ? amenities.map((amenity, index) => (
              <span className={style.HotelAmenitiesIcon}>
                {amenityIcons[amenity.name]}
              </span>
            ))
          : amenities.map((amenity, index) => (
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
      {!isHotelCard && amenities?.length > 0 && (
        <Button
          variant="outlined"
          onClick={handleOpenAmenitiesDialog}
          className={style.amenitiesButton}
        >
          {localization.seeAmenititesDetails}
        </Button>
      )}
      {!isHotelCard && (
        <AmenityDialog
          open={openAmenitiessDialog}
          handleClose={handleCloseAmenitiesDialog}
          amenities={amenities}
        />
      )}
    </div>
  );
}
