import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import { handleError } from "../../../services/ApisConfig";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import getCities from "../../../services/cities/Cities.service";

export default function AdminCities() {
  const [citiesInfo, setcitiesInfo] = useState();
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const citiesInfo = await getCities();
        setcitiesInfo(citiesInfo);
      } catch (error) {
        let { message, type } = handleError(error);
        throw { message, type };
      }
    };

    fetchSearchResults();
  }, []);
  console.log("cities Info : ", citiesInfo);
  const handleSearch = (searchText: string) => {};
  const handleDeleteCity = () => {};
  const handleEditCity = () => {};

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      <SearchBar onSearch={handleSearch} />
      <TableWithNavigation
        data={citiesInfo}
        itemsPerPage={5}
        onDelete={handleDeleteCity}
        onEdit={handleEditCity}
      />
    </Box>
  );
}
