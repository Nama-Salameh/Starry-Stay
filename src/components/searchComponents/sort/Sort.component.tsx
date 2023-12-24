import React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useSearchContext } from "../../../contexts/SearchContext.context";
import localization from "../../../localizationConfig";
import style from "./Sort.module.css";
export default function Sort() {
  const { searchParams, setSearchParamsValue } = useSearchContext();

  const handleChange = (event: SelectChangeEvent<string>) => {
    const selectedSortType = event.target.value as string;
    setSearchParamsValue("sort", selectedSortType);
  };
  return (
    <div>
      <Select
        displayEmpty
        value={searchParams.sort}
        onChange={handleChange}
        input={<OutlinedInput />}
        renderValue={() => {
          return <span>{localization.sortBy}</span>;
        }}
        inputProps={{ "aria-label": "Without label" }}
        className={style.selectSortTypeContainer}
      >
        <MenuItem disabled value="">
          <em>{localization.sortBy}</em>
        </MenuItem>
        <MenuItem value={localization.ascendingSortType}>
          {localization.ascending}
        </MenuItem>
        <MenuItem value={localization.descendingSortType}>
          {localization.descending}
        </MenuItem>
      </Select>
    </div>
  );
}