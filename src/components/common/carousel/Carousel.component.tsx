import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { ReactNode } from "react";
import style from "./Carousel.module.css";

const autoResponsive = {
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
    items: 5,
  },
  desktopSmall: {
    breakpoint: { max: 1300, min: 1000 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1000, min: 700 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 700, min: 450 },
    items: 2,
    centerPadding: 50,
  },
  mobileSmall: {
    breakpoint: { max: 450, min: 0 },
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
      centerMode={false}
      className={style.carousel}
    >
      {children}
    </MultiCarousel>
  );
};

export default Carousel;
