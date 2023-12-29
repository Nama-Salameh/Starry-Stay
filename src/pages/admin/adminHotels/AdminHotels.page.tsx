import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import { getHotels } from "../../../services/hotels/Hotels.service";
import { handleError } from "../../../services/ApisConfig";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";

export default function AdminHotels() {
  const [hotelsInfo, setHotelsInfo] = useState();
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

  const handleSearch = (searchText: string) => {};
  const handleDeleteHotel = () => {};
  const handleEditHotel = () => {};

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      <SearchBar onSearch={handleSearch} />
      <TableWithNavigation
        data={hotelsInfo}
        itemsPerPage={5}
        onDelete={handleDeleteHotel}
        onEdit={handleEditHotel}
      />
    </Box>
  );
}
