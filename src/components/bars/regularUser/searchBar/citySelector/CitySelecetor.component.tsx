import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import style from "./CitySelector.module.css";

const CitySelector: React.FC<{
  cities: { id: string; name: string; description: string }[];
}> = ({ cities }) => {
  const [cityName, setCityName] = React.useState<string>("");

  const handleChange = (event: SelectChangeEvent<typeof cityName>) => {
    setCityName(event.target.value);
  };

  return (
    <div>
      <FormControl className={style.cityFormControl}>
        <Select
          displayEmpty
          value={cityName}
          onChange={handleChange}
          input={<OutlinedInput />}
          className={style.selectContainer}
          renderValue={() => {
            if (!cityName) {
              return (
                <div className={style.locationSelectorPlaceholder}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={style.locationIcon}
                  />
                  Going to ?
                </div>
              );
            }
            return (
              <div className={style.locationSelectorPlaceholder}>
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className={style.locationIcon}
                />
                {cityName}
              </div>
            );
          }}
          MenuProps={{
            PaperProps: {
              className: style.menuPaper,
            },
          }}
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem disabled value="">
            <em>
              <FontAwesomeIcon icon={faLocationDot} /> Going to ?
            </em>
          </MenuItem>
          {cities.map((city) => (
            <MenuItem key={city.id} value={city.name}>
              {city.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default CitySelector;
