import React, { ChangeEvent, useEffect } from "react";
import localization from "../../../../localizationConfig";
import {
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import style from "./SearchBar.module.css";
import debounce from "lodash.debounce";

const SearchBar: React.FC<{
  onSearch: (searchTerm: string, selectedOption: string) => void;
  selectedOption: string;
  onOptionChange: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
  onTextChange: React.Dispatch<React.SetStateAction<string>>;
}> = ({
  onSearch,
  selectedOption,
  onOptionChange,
  searchText,
  onTextChange,
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTextChange(event.target.value);
  };

  const handleOptionChange = (event: SelectChangeEvent<string>) => {
    onOptionChange(event.target.value);
  };

  const delayedSearch = debounce(() => {
    onSearch(searchText, selectedOption);
  }, 500);

  useEffect(() => {
    if (searchText !== "") {
      delayedSearch();
      return delayedSearch.cancel;
    }
  }, [searchText, selectedOption]);

  return (
    <TextField
      type="text"
      placeholder="Search..."
      variant="outlined"
      value={searchText}
      className={style.textField}
      onChange={handleInputChange}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FormControl>
              <Select
                labelId="search-option-label"
                id="search-option"
                value={selectedOption}
                onChange={handleOptionChange}
                className={style.selectContainer}
              >
                <MenuItem value="name">{localization.name}</MenuItem>
                <MenuItem value="description">{localization.description}</MenuItem>
              </Select>
            </FormControl>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
