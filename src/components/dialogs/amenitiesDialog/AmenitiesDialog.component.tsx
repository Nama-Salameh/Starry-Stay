import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PoolIcon from "@mui/icons-material/Pool";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import WifiIcon from "@mui/icons-material/Wifi";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import LocalBarIcon from "@mui/icons-material/LocalBar";
import style from "./AmenitiesDialog.module.css";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton } from "@mui/material";
import HotTubIcon from "@mui/icons-material/HotTub";
import WaterIcon from "@mui/icons-material/Water";
import TvIcon from "@mui/icons-material/Tv";
import BedIcon from "@mui/icons-material/Bed";
import RoomServiceIcon from "@mui/icons-material/RoomService";

interface AmenityDialogProps {
  open: boolean;
  handleClose: () => void;
  amenities: { id?: number; name: string; description: string }[];
}

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

const AmenityDialog: React.FC<AmenityDialogProps> = ({
  open,
  handleClose,
  amenities,
}) => {
  const handleDialogClose = () => {
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogActions className={style.closeButtonContainer}>
        <IconButton
          edge="start"
          color="primary"
          onClick={handleDialogClose}
          aria-label="close"
          className={style.closeButton}
        >
          <CloseIcon />
        </IconButton>
      </DialogActions>
      <DialogTitle className={style.dialogTitle}>Hotel Amenities</DialogTitle>
      <DialogContent>
        {amenities.map((amenity, index) => (
          <div key={index} className={style.dialogItem}>
            <div className={style.amenityHeader}>
              <span>
                {amenityIcons[amenity.name] || (
                  <CheckCircleOutlineIcon className={style.icon} />
                )}
              </span>
              <h6>{amenity.name}</h6>
            </div>
            <p className={style.amenityDescription}>{amenity.description}</p>
            <Divider />
          </div>
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default AmenityDialog;
