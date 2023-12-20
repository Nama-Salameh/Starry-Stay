import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import localization from "../../../localizationConfig";
import style from "./PriceRating.module.css";
export default function PriceRating() {
  const [value, setValue] = useState<number[]>([100, 300]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };
  const valueLabelFormat = (value: number) => {
    return `$${value}`;
  };
  return (
    <div className={style.priceRatingContainer}>
      <div className={style.priceHeader}>
        <h3>{localization.price}</h3>
        <span>({localization.perNight})</span>
      </div>
      <Slider
        getAriaLabel={() => "Price range"}
        size="medium"
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => `$${value}`}
        min={100}
        max={500}
        className={style.priceRating}
        valueLabelFormat={valueLabelFormat}
      />
      <div className={style.minMaxValues}>
        <span> ${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}
