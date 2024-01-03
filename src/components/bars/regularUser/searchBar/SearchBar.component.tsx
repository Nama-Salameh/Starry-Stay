import React, { useEffect, startTransition } from "react";
import CitySelector from "./citySelector/CitySelecetor.component";
import { getCities } from "../../../../services/cities/Cities.service";
import DateRangePickerComponent from "./datePicker/DatePicker.component";
import style from "./SearchBar.module.css";
import RoomsSelector from "./roomSelector/RoomsSelector.component";
import SmallButton from "../../../common/Buttons/SmallButton.component";
import localization from "../../../../localizationConfig";
import { useNavigate } from "react-router-dom";
import { notifyError } from "../../../../utils/toastUtils/Toast.utils";
import { ErrorTypes } from "../../../../enums/ErrprTypes.enum";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.citiesNotFound,
  unknown: localization.serverIssues,
};

export default function SearchBar() {
  const navigate = useNavigate();
  const [cities, setCities] = React.useState<
    { id: string; name: string; description: string }[]
  >([]);

  const fetchData = async () => {
    try {
      const citiesInfo = await getCities();
      setCities(citiesInfo);
    } catch (errorType) {
      switch (errorType) {
        case ErrorTypes.Network:
          notifyError(errorMessages.network);
          break;
        case ErrorTypes.NotFound:
          notifyError(errorMessages.notFound);
          break;
        case ErrorTypes.Unknown:
          notifyError(errorMessages.unknown);
          break;
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchButtonClick = () => {
    startTransition(() => {
      navigate("/search");
    });
  };
  return (
    <div className={style.searchBarContainer}>
      <CitySelector cities={cities} />
      <DateRangePickerComponent />
      <RoomsSelector />
      <SmallButton
        value={localization.search}
        onClick={handleSearchButtonClick}
        buttonWidth={80}
      />
    </div>
  );
}
