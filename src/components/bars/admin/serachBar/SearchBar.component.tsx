import React, { useState, ChangeEvent } from "react";
import localization from "../../../../localizationConfig";
import { TextField } from "@mui/material";

const SearchBar: React.FC<{ onSearch: (searchTerm: string) => void }> = ({
  onSearch,
}) => {
  const [searchText, setSearchText] = useState<string>("");

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <TextField
      type="text"
      placeholder="Search..."
      variant="outlined"
      value={searchText}
      onChange={handleInputChange}
      style={{
        width: "100%",
        marginRight: "5px",
        height: "51px",
        borderRadius: 2,
        paddingRight: 0,
      }}
    />
  );
};

export default SearchBar;
