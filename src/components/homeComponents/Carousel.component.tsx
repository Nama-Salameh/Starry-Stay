import MultiCarousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React , {ReactNode} from "react";
import style from "./HomeComponents.module.css";

const Carousel: React.FC<{ children : ReactNode}> = ({ children }) => {
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
      breakpoint: { max: 1300, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 900, min: 600 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <MultiCarousel
        responsive={responsive}
        infinite={false}
        className={style.carousel}
      >
       {children}
      </MultiCarousel>
    </div>
  );
};

export default Carousel;
