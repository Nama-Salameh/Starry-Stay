import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../components/bars/regularUser/searchBar/SearchBar.component";
import localization from "../../localizationConfig";
import RecenlyVisitedHotels from "../../components/homeComponents/recenlyVisitedHotels/RecenlyVisitedHotels.component";
import TrendingDestinationsContainer from "../../components/homeComponents/trendingDestinationsContainer/TrendingDestinationsContainer.component";
import { isLoggedIn, isSessionExpired } from "../../utils/TokenUtils";
import FeaturedDealsHotelsContainer from "../../components/homeComponents/featuredDealsHotelsContainer/FeaturedDealsContainer.component";
import style from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <SearchBar />
      
        <Box component="main" sx={{ p: 1.5, pt: 12 }}>
          <Toolbar />
          <FeaturedDealsHotelsContainer />
          {isLoggedIn() && !isSessionExpired() && <RecenlyVisitedHotels />}
          <TrendingDestinationsContainer />
        </Box>
    </div>
  );
}
