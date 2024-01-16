import React, { useState } from "react";
import RoomCard from "../../common/roomCard/RoomCard.component";
import style from "./RoomsContainer.module.css";
import { Button } from "@mui/material";
import localization from "../../../localizationConfig";
import IRoom from "../../../interfaces/IRoom.interface";


export default function RoomContainer({
  hotelRooms,
  hotelId,
}: {
  hotelRooms: IRoom[];
  hotelId: number;
}) {
  const [showAllRooms, setShowAllRooms] = useState(false);
  const displayedRooms = showAllRooms ? hotelRooms : hotelRooms.slice(0, 3);
  const handleSeeAllRooms = () => {
    setShowAllRooms(true);
  };
  const handleHideRooms = () => {
    setShowAllRooms(false);
  };
  return (
    <div>
      <div className={style.roomContainerWrapper}>
        {Array.isArray(displayedRooms) &&
          displayedRooms.map((room) => (
            <RoomCard key={room.roomId} room={room} hotelId={hotelId} />
          ))}
      </div>
      {!showAllRooms && hotelRooms.length > 3 && (
        <Button
          variant="outlined"
          className={style.seeAllButton}
          onClick={handleSeeAllRooms}
        >
          {localization.seeAllRooms}
        </Button>
      )}
      {showAllRooms && hotelRooms.length > 3 && (
        <Button
          variant="outlined"
          className={style.hideRoomsButton}
          onClick={handleHideRooms}
        >
          {localization.hideRooms}
        </Button>
      )}
    </div>
  );
}
