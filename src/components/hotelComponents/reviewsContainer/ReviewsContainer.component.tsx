import React, { useState, useEffect } from "react";
import style from "./ReviewsContainer.module.css";
import { Avatar, Button, Rating } from "@mui/material";
import { getHotelReviewsByItsId } from "../../../services/hotels/Hotels.service";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import localization from "../../../localizationConfig";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.hotelNotFound,
  unknown: localization.serverIssues,
};

export default function ReviewsContainer({ hotelId }: { hotelId: number }) {
  const [hotelReviews, setHotelReviews] = useState<
    { id: number; customerName: string; rating: number; description: string }[]
  >([]);
  useEffect(() => {
    const fetchHotelAmenities = async () => {
      try {
        const hotelReviews = await getHotelReviewsByItsId(hotelId);
        setHotelReviews(hotelReviews || []);
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.NotFound:
            notifyError(errorMessages.notFound);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
        }
      }
    };

    fetchHotelAmenities();
  }, []);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews
    ? hotelReviews
    : hotelReviews.slice(0, 3);

  const handleSeeAllReviews = () => {
    setShowAllReviews(true);
  };
  const handleHideAllReviews = () => {
    setShowAllReviews(false);
  };
  return (
    <div className={style.reviewsContainer}>
      <h2>Reviews</h2>
      {displayedReviews.map((review, index) => (
        <div key={index} className={style.review}>
          <div className={style.reviewsHeader}>
            <Avatar sx={{ width: 32, height: 32 }} variant="square">
              {review.customerName.charAt(0)}
            </Avatar>
            <div className={style.reviewerInfo}>
              <h4 className={style.customerName}>{review.customerName}</h4>
              <Rating value={review.rating} size="small" readOnly />
            </div>
          </div>
          <p className={style.reviewDescription}>{review.description}</p>
        </div>
      ))}

      {hotelReviews.length > 3 && !showAllReviews && (
        <Button
          onClick={handleSeeAllReviews}
          className={style.seeAllReviewsButton}
          variant="outlined"
        >
          {localization.seeAllReviews}
        </Button>
      )}
      {hotelReviews.length > 3 && showAllReviews && (
        <Button
          onClick={handleHideAllReviews}
          className={style.hideAllReviewsButton}
          variant="outlined"
        >
          {localization.hideAllReviews}
        </Button>
      )}
    </div>
  );
}
