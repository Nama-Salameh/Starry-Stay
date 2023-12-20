import React from "react";
import { Rating } from "@mui/material";
import localization from "../../../localizationConfig";
import style from './StarRating.module.css';
export default function StarRating() {
  const [value, setValue] = React.useState<number | null>(2);

  return (
    <div className={style.starRatingContainer}>
      <h3>{localization.starRating}</h3>
      <Rating
        name="simple-controlled"
        value={value}
        className={style.starRating}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      />
    </div>
  );
}
