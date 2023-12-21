import React, { useState } from "react";
import { Button, Menu } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import style from "./RoomSelector.module.css";
import RoomCounterControl from "./RoomCounterControl.component";
import { useSearchContext } from "../../../../../contexts/SearchContext.context";
import localization from "../../../../../localizationConfig";

const RoomSelector = () => {
  const [roomMenuAnchor, setroomMenuAnchor] = useState<null | HTMLElement>(
    null
  );
  const { searchParams, setSearchParamsValue } = useSearchContext();

  const handleIncrement = (param: keyof typeof searchParams) => () => {
    setSearchParamsValue(param, searchParams[param] + 1);
  };

  const handleDecrement = (param: keyof typeof searchParams) => () => {
    setSearchParamsValue(param, Math.max(searchParams[param] - 1, 0));
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
          {searchParams.adults} Adults, {searchParams.children} Children,{" "}
          {searchParams.rooms} Rooms
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
          value={searchParams.rooms}
          onIncrement={handleIncrement(localization.rooms)}
          onDecrement={handleDecrement(localization.rooms)}
        />
        <RoomCounterControl
          label="Adults"
          value={searchParams.adults}
          onIncrement={handleIncrement(localization.adults)}
          onDecrement={handleDecrement(localization.adults)}
        />
        <RoomCounterControl
          label="Children"
          value={searchParams.children}
          onIncrement={handleIncrement(localization.children)}
          onDecrement={handleDecrement(localization.children)}
        />
      </Menu>
    </div>
  );
};

export default RoomSelector;
