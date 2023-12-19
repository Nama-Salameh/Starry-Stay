import React, { useState } from "react";
import { Button, Menu } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import style from "./RoomSelector.module.css";
import RoomCounterControl from "./RoomCounterControl.component";

const RoomSelector: React.FC = () => {
  const [roomMenuAnchor, setroomMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const handleIncrement =
    (stateSetter: React.Dispatch<React.SetStateAction<number>>) => () => {
      stateSetter((prevValue) => prevValue + 1);
    };

  const handleDecrement =
    (stateSetter: React.Dispatch<React.SetStateAction<number>>) => () => {
      stateSetter((prevValue) => Math.max(prevValue - 1, 0));
    };

  const handleOpenRoomMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setroomMenuAnchor(event.currentTarget);
  };

  const handleCloseRoomMenu = () => {
    setroomMenuAnchor(null);
  };

  return (
    <div className={style.roomsSelectorContainer}>
      <Button
        aria-controls="room-selector-menu"
        aria-haspopup="true"
        onClick={handleOpenRoomMenu}
        startIcon={<FontAwesomeIcon icon={faUsers} />}
        className={style.roomsSelectorButton}
        disableRipple
      >
        <span className={style.responsiveText}>
          {adults} Adults, {children} Children, {rooms} Rooms
        </span>
        <FontAwesomeIcon icon={faChevronDown} className={style.downArrow} />
      </Button>

      <Menu
        id="room-selector-menu"
        anchorEl={roomMenuAnchor}
        open={Boolean(roomMenuAnchor)}
        onClose={handleCloseRoomMenu}
      >
        <RoomCounterControl
          label="Rooms"
          value={rooms}
          onIncrement={handleIncrement(setRooms)}
          onDecrement={handleDecrement(setRooms)}
        />
        <RoomCounterControl
          label="Adults"
          value={adults}
          onIncrement={handleIncrement(setAdults)}
          onDecrement={handleDecrement(setAdults)}
        />
        <RoomCounterControl
          label="Children"
          value={children}
          onIncrement={handleIncrement(setChildren)}
          onDecrement={handleDecrement(setChildren)}
        />
      </Menu>
    </div>
  );
};

export default RoomSelector;
