import { Button } from "@mui/material";
import Loader from "react-js-loader";
import style from "./Loaders.module.css";
import "./Loaders.module.css";

export default function SmallButtonLoader({
  buttonWidth = "150px",
  buttonHeight = "50px",
}: {
  buttonWidth?: string;
  buttonHeight?: string;
}) {
  return (
    <Button
      className={`${style.smallButton} small-loader`}
      style={{ width: buttonWidth, height: buttonHeight }}
      disabled
      variant="contained"
    >
      <Loader type="spinner-cub" size={20} />
    </Button>
  );
}
