import React from "react";
import Loader from "react-js-loader";
import style from "./Loaders.module.css";
import { Button } from "@mui/material";

const BigButtonLoader: React.FC<{
  buttonWidth?: number;
}> = ({ buttonWidth = 500 }) => {
  return (
    <Button
      disabled
      className={style.bigButton}
      variant="contained"
      sx={{ width: buttonWidth }}
    >
      <Loader type="bubble-scale" size={50} />
    </Button>
  );
};
export default BigButtonLoader;
