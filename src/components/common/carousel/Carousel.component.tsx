import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { ReactNode } from "react";
import style from "./Carousel.module.css";

const autoResponsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 6,
    centerPadding: 0,
  },
  desktopLarge: {
    breakpoint: { max: 3000, min: 1600 },
    items: 5,
    centerPadding: 50,
  },
  desktopMedium: {
    breakpoint: { max: 1600, min: 1300 },
    items: 4,
    centerPadding: 50,
  },
  desktopSmall: {
    breakpoint: { max: 1300, min: 850 },
    items: 3,
    centerPadding: 50,
  },
  tablet: {
    breakpoint: { max: 850, min: 500 },
    items: 2,
    centerPadding: 50,
  },
  mobile: {
    breakpoint: { max: 500, min: 0 },
    items: 1,
    centerPadding: 50,
  },
};

const Carousel: React.FC<{
  children: ReactNode;
  responsive?: {
    [key: string]: {
      breakpoint: { max: number; min: number };
      items: number;
    };
  };
}> = ({ children, responsive }) => {

  return (
    <MultiCarousel
      responsive={responsive || autoResponsive}
      infinite={false}
      className={style.carousel}
    >
      {children}
    </MultiCarousel>
  );
};

export default Carousel;
