import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchBar from "../../components/bars/regularUser/searchBar/SearchBar.component";
import localization from "../../localizationConfig";
import RecenlyVisitedHotels from "../../components/homeComponents/recenlyVisitedHotels/RecenlyVisitedHotels.component";
import {
  getDecodedToken,
  isLoggedIn,
  isSessionExpired,
} from "../../utils/TokenUtils";
import FeaturedDealsHotelsContainer from "../../components/homeComponents/featuredDealsHotelsContainer/FeaturedDealsContainer.component";
import style from "./Home.module.css";
import {
  getFeaturedDeals,
  getRecentlyVisitedHotels,
  getTrendingDestinations,
} from "../../services/home/home.service";
import { notifyError } from "../../utils/toastUtils/Toast.utils";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import { CircularProgress } from "@mui/material";
import TrendingDestinationsContainer from "../../components/homeComponents/trendingDestinationsContainer/TrendingDestinationsContainer.component";
import IToken from "../../interfaces/IToken.interface";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.contentNotFound,
  unknown: localization.serverIssues,
};

type City = {
  cityId: number;
  cityName: string;
  countryName: string;
  description: string;
  thumbnailUrl: string;
};

export default function Home() {
  const decodedToken: IToken | null = getDecodedToken() as IToken | null;
  const userIdString = decodedToken?.user_id || "";
  const userId = parseInt(userIdString, 10);
  const [recentlyVisitedHotels, setRecentlyVisitedHotels] = useState<any[]>([]);
  const [featuredDeals, setFeaturedDeals] = useState<any[]>([]);
  const [trendingDestinations, setTrendingDestinations] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = localization.homePageTitle;
  });

  useEffect(() => {
    const fetchHomePageInfo = async () => {
      try {
        const trendingDestinationInfo = await getTrendingDestinations();
        setTrendingDestinations(trendingDestinationInfo || []);
        const recentlyVisitedHotels = await getRecentlyVisitedHotels(userId);
        setRecentlyVisitedHotels(recentlyVisitedHotels);
        const featuredDeals = await getFeaturedDeals();
        setFeaturedDeals(featuredDeals);
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.NotFound:
            notifyError(errorMessages.notFound);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchHomePageInfo();
  }, []);

  return (
    <div>
      <SearchBar />
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>{localization.loading}</span>
        </div>
      )}
      {!isLoading && (
        <Box component="main" sx={{ p: 1.5, pt: 12 }}>
          <Toolbar />
          <FeaturedDealsHotelsContainer featuredDeals={featuredDeals} />
          {isLoggedIn() && !isSessionExpired() && (
            <RecenlyVisitedHotels
              recentlyVisitedHotels={recentlyVisitedHotels}
            />
          )}
          <TrendingDestinationsContainer
            trendingDestinations={trendingDestinations}
          />
        </Box>
      )}
    </div>
  );
}
