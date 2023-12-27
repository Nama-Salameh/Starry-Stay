import React from "react";
import { Rating } from "@mui/material";
import localization from "../../../localizationConfig";
import style from "./StarRating.module.css";
import { useSearchContext } from "../../../contexts/searchContext/SearchContext.context";

export default function StarRating() {
  const { searchParams, setSearchParamsValue } = useSearchContext();

  return (
    <div className={style.starRatingContainer}>
      <h3>{localization.starRating}</h3>
      <Rating
        readOnly
        name="simple-controlled"
        value={searchParams.starRate}
        className={style.starRating}
        onChange={(event, newValue) => {
          setSearchParamsValue("starRate", newValue);
        }}
      />
    </div>
  );
}
