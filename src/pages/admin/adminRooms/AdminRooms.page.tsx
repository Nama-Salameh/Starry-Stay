import React from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";

const handleSearch = (searchText: string) => {};

export default function AdminRooms() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      <SearchBar onSearch={handleSearch} />
    </Box>
  );
}
