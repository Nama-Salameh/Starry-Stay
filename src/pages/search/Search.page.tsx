import React, { useState, useEffect } from "react";
import localization from "../../localizationConfig";
import SearchBar from "../../components/bars/regularUser/searchBar/SearchBar.component";
import { Box, Divider, useMediaQuery } from "@mui/material";
import SmallButton from "../../components/common/Buttons/SmallButton.component";
import FilteringDialog from "../../components/dialogs/filteringDialog/FilteringDialog.component";
import FilteringContent from "../../components/searchComponents/FilteringContent.component";
import style from "./Search.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import { useSearchContext } from "../../contexts/searchContext/SearchContext.context";
import { getSearchResultRegularUser } from "../../services/search/Search.service";
import HotelsContainer from "../../components/searchComponents/hotel/HotelsConatainer.component";
import Sort from "../../components/searchComponents/sort/Sort.component";
import { notifyError } from "../../utils/toastUtils/Toast.utils";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";

const errorMessages = {
  network: localization.networkError,
  unknown: localization.searchUnknownError,
};

export default function Search() {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [modalOpen, setModalOpen] = useState(false);
  const { searchParams } = useSearchContext();
  const [hotelsSearchResults, setHotelsSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await getSearchResultRegularUser(
          searchParams.checkInDate,
          searchParams.checkOutDate,
          searchParams.city,
          searchParams.rooms,
          searchParams.children,
          searchParams.adults,
          searchParams.starRate,
          searchParams.sort
        );
        setHotelsSearchResults(results);
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
        }
      }
    };
    if (searchParams) {
      fetchSearchResults();
    }
  }, [searchParams]);

  const toggleFilteringModal = () => {
    setModalOpen(!modalOpen);
  };
  return (
    <div className={style.pageContainer}>
      <SearchBar />
      <Box component="main" sx={{ p: 1, pt: 20 }} className={style.mainContent}>
        {isSmallScreen ? (
          <div className={style.smallPageContainer}>
            <div className={style.filtersContainer}>
              <SmallButton
                onClick={toggleFilteringModal}
                value={localization.filterBy}
                isSecondaryBackgroundColor={true}
                buttonWidth={150}
                icon={<TuneIcon />}
              />
              <Sort />
            </div>
            <FilteringDialog
              modalOpen={modalOpen}
              toggleFilteringModal={toggleFilteringModal}
            />
            <div className={style.hotelsContainerWithoutSideBar}>
              <Divider />
              <HotelsContainer hotelsSearchResult={hotelsSearchResults} />
            </div>
          </div>
        ) : (
          <div className={style.searchContainerWithSideBar}>
            <div className={style.filterSideBarContainer}>
              <FilteringContent />
            </div>
            <div className={style.bigPageContainer}>
              <div className={style.sortContainer}>
                <Sort />
              </div>
              <div className={style.hotelsContainer}>
                <HotelsContainer hotelsSearchResult={hotelsSearchResults} />
              </div>
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
