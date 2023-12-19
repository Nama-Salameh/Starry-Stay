import React from "react";
import localization from "../../localizationConfig";
import SearchBar from "../../components/bars/regularUser/searchBar/SearchBar.component";
import { Box } from "@mui/material";

export default function Search() {
  return (
    <div>
      <SearchBar />
      <Box component="main" sx={{ p: 1.5, pt: 12 }}>
        {localization.search}
      </Box>
    </div>
  );
}
