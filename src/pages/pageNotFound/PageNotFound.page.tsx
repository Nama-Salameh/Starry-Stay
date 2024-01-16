import React, { useEffect } from "react";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import localization from "../../localizationConfig";
import style from "./PageNotFound.module.css";

const PageNotFound = () => {
  useEffect(() => {
    document.title = localization.notFoundPageTitle;
  })
  return (
    <div className={style.pageContainer}>
      <ErrorOutlineIcon className={style.pageNotFoundIcon} />
      <h3 className={style.pageNotFoundTitle}>{localization.pageNotFound}</h3>
    </div>
  );
};

export default PageNotFound;
