import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { ReactNode } from "react";
import style from "./Carousel.module.css";

const Carousel: React.FC<{ children: ReactNode }> = ({ children }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktopLarge: {
      breakpoint: { max: 3000, min: 1600 },
      items: 5,
    },
    desktopMedium: {
      breakpoint: { max: 1600, min: 1300 },
      items: 4,
    },
    desktopSmall: {
      breakpoint: { max: 1300, min: 850 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 850, min: 500 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 500, min: 0 },
      items: 1,
    },
  };

  return (
    <MultiCarousel
      responsive={responsive}
      infinite={false}
      className={style.carousel}
    >
      {children}
    </MultiCarousel>
  );
};

export default Carousel;
