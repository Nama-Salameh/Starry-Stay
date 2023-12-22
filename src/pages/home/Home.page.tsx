import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../components/bars/regularUser/searchBar/SearchBar.component";
import localization from "../../localizationConfig";
import {
  getFeaturedDealsHotels,
  getTrendingDestinationHotels,
} from "../../services/home/home.service";
import HotelsContainer from "../../components/homeComponents/hotelsConatiner/HotelsContainer.component";

export default function Home() {
  const featuredDealsHotels = getFeaturedDealsHotels();
  const trendingDestinations = getTrendingDestinationHotels();

  return (
    <Box>
      <SearchBar />
      <Box component="main" sx={{ p: 1.5, pt: 12 }}>
        <Toolbar />
        <HotelsContainer/>
      </Box>
    </Box>
  );
}
