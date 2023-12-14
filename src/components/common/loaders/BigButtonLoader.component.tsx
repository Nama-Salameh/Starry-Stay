import Loader from "react-js-loader";
import style from "./Loaders.module.css";
import { Button } from "@mui/material";

export default function BigButtonLoader() {
  return (
    <Button
      disabled
      className={style.bigButton}
      variant="contained"
    >
      <Loader type="bubble-scale" size={50} />
    </Button>
  );
};
