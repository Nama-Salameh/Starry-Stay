import React, { useEffect, startTransition } from "react";
import CitySelector from "./citySelector/CitySelecetor.component";
import getCities from "../../../../services/cities/Cities.service";
import DateRangePickerComponent from "./datePicker/DatePicker.component";
import style from "./SearchBar.module.css";
import RoomsSelector from "./roomSelector/RoomsSelector.component";
import SmallButton from "../../../common/Buttons/SmallButton.component";
import localization from "../../../../localizationConfig";
import { useNavigate } from "react-router-dom";
import { handleError } from "../../../../services/ApisConfig";

export default function SearchBar() {
  const navigate = useNavigate();
  const [cities, setCities] = React.useState<
    { id: string; name: string; description: string }[]
  >([]);

  const fetchData = async () => {
    try {
      const citiesInfo = await getCities();
      setCities(citiesInfo);
    } catch (error) {
      let { message, type } = handleError(error);
      throw { message, type };
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
