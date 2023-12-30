import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import {
  getFilteredHotels,
  getHotels,
} from "../../../services/hotels/Hotels.service";
import { handleError } from "../../../services/ApisConfig";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";

export default function AdminHotels() {
  const [hotelsInfo, setHotelsInfo] = useState();
  const [selectedOption, setSelectedOption] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await getHotels();
        setHotelsInfo(results);
      } catch (error) {
        let { message, type } = handleError(error);
        throw { message, type };
      }
    };

    fetchSearchResults();
  }, []);
  console.log("hotels info :", hotelsInfo);

  const handleDebouncedSearch = async () => {
    try {
      let filteredCities;

      if (selectedOption === "name") {
        filteredCities = await getFilteredHotels({ name: searchText });
      } else if (selectedOption === "description") {
        filteredCities = await getFilteredHotels({ searchQuery: searchText });
      } else {
        filteredCities = await getHotels();
      }
      setHotelsInfo(filteredCities);
    } catch (error) {
      notifyError("Something happen while searching for a hotel, try again");
    }
  };
  const handleDeleteHotel = () => {};
  const handleEditHotel = () => {};

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      <SearchBar
        onSearch={handleDebouncedSearch}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
        searchText={searchText}
        onTextChange={setSearchText}
      />
      <TableWithNavigation
        data={hotelsInfo}
        itemsPerPage={5}
        onDelete={handleDeleteHotel}
        onEdit={handleEditHotel}
      />
    </Box>
  );
}
