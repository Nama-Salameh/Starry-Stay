import * as React from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../components/bars/regularUser/searchBar/SearchBar.component";
import localization from "../../localizationConfig";
import {
  getFeaturedDealsHotels,
  getRecentlyVisitedHotels,
  getTrendingDestinationHotels,
} from "../../services/home/home.service";
import { getDecodedToken } from "../../utils/TokenUtils";
import IToken from "../../interfaces/IToken.interface";

export default function Home() {
  const userToken: IToken | null = getDecodedToken() as IToken | null;
  const featuredDealsHotels = getFeaturedDealsHotels();
  const trendingDestinations = getTrendingDestinationHotels();
  const recentlyVisitedHotels = userToken
    ? getRecentlyVisitedHotels(parseInt(userToken.sub, 10))
    : null;

  return (
    <Box>
      <SearchBar />
      <Box component="main" sx={{ p: 1.5, pt: 12 }}>
        <Toolbar />
        {localization.home}
      </Box>
    </Box>
  );
}
