import React, { useState } from "react";
import style from "./ReviewsContainer.module.css";
import { Avatar, Button, Rating } from "@mui/material";
import localization from "../../../localizationConfig";


export default function ReviewsContainer({reviews }: { reviews:{ reviewId: number; customerName: string; rating: number; description: string }[] }) {
  
  const [showAllReviews, setShowAllReviews] = useState(false);
  const displayedReviews = showAllReviews
    ? reviews
    : reviews.slice(0, 3);

  const handleSeeAllReviews = () => {
    setShowAllReviews(true);
  };
  const handleHideAllReviews = () => {
    setShowAllReviews(false);
  };
  return (
    <div className={style.reviewsContainer}>
      <h2>{localization.reviews}</h2>
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

      {reviews.length > 3 && !showAllReviews && (
        <Button
          onClick={handleSeeAllReviews}
          className={style.seeAllReviewsButton}
          variant="outlined"
        >
          {localization.seeAllReviews}
        </Button>
      )}
      {reviews.length > 3 && showAllReviews && (
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
