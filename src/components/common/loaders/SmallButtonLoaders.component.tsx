import { Button } from "@mui/material";
import Loader from "react-js-loader";
import style from "./Loaders.module.css";
import "./Loaders.module.css";

export default function SmallButtonLoader({
  buttonWidth = "150px",
}: {
  buttonWidth?: string;
}) {
  return (
    <Button
      style={{ width: buttonWidth }}
      disabled
      className={`${style.smallButton} small-loader`}
      variant="contained"
    >
      <Loader type="spinner-cub" size={20} />
    </Button>
  );
}
