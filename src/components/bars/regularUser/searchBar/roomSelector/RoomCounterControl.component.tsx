import React, { ReactEventHandler } from "react";
import { Button, MenuItem } from "@mui/material";
import style from "./RoomSelector.module.css";

const RoomCounterControl = ({
  label,
  value,
  onIncrement,
  onDecrement,
}: {
  label: string;
  value: number;
  onIncrement: ReactEventHandler;
  onDecrement: ReactEventHandler;
}) => (
  <MenuItem disableRipple>
    <div className={style.roomsContainer}>
      <label className={style.labelContainer}>{label}</label>
      <div>
        <Button onClick={onDecrement} className={style.decrementButton}>
          -
        </Button>
        <span>{value}</span>
        <Button onClick={onIncrement} className={style.incrementButton}>
          +
        </Button>
      </div>
    </div>
  </MenuItem>
);
export default RoomCounterControl;
