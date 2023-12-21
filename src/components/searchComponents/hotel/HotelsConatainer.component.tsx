import { Rating, useMediaQuery } from "@mui/material";
import React from "react";
import SmallButton from "../../common/Buttons/SmallButton.component";
import localization from "../../../localizationConfig";
import { useNavigate } from "react-router";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import IHotel from "../../../interfaces/IHotel.interface";
import { useTheme } from "@mui/system";
import style from "./HotelsContainer.module.css";

export default function HotelsContainer({
  hotelsSearchResult,
}: {
  hotelsSearchResult: IHotel[];
}) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:550px)");

  return (
    <div>
      {hotelsSearchResult.map((hotel, index) => (
        <div className={style.hotelContainer} key={index}>
          <img
            src={hotel.roomPhotoUrl}
            alt={`Hotel ${hotel.hotelName}`}
            className={style.hotelImage}
          />
          <div className={style.hotelInfoContainer}>
            <h3 className={style.hotelName}>{hotel.hotelName}</h3>
            <Rating value={hotel.starRating} className={style.hotelRating} />
            <p className={style.hotelPrice}>
              <b>${hotel.roomPrice}</b> {localization.forTonight}
            </p>
            <div className={style.smallButtonContainer}>
              <SmallButton
                value={isSmallScreen ? "" : localization.addToCart}
                icon={
                  <AddShoppingCartIcon
                    style={{
                      color: theme.palette.secondary.main,
                    }}
                  />
                }
                onClick={() => {
                  navigate("/hotel");
                }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
