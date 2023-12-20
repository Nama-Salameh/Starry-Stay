import React, { useState } from "react";
import localization from "../../localizationConfig";
import SearchBar from "../../components/bars/regularUser/searchBar/SearchBar.component";
import { Box, useMediaQuery } from "@mui/material";
import SmallButton from "../../components/common/Buttons/SmallButton.component";
import FilteringDialog from "../../components/dialogs/filteringDialog/FilteringDialog.component";
import FilteringContent from "../../components/searchComponents/FilteringContent.component";
import style from "./Search.module.css";
import TuneIcon from "@mui/icons-material/Tune";
import Hotel from "../../components/searchComponents/hotel/Hotel.component";

export default function Search() {
  const isSmallScreen = useMediaQuery("(max-width:900px)");
  const [modalOpen, setModalOpen] = useState(false);

  const toggleFilteringModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div>
      <SearchBar />
      <Box component="main" sx={{ p: 1.5, pt: 20 }}>
        {isSmallScreen ? (
          <div>
            <SmallButton
              onClick={toggleFilteringModal}
              value={localization.filterBy}
              isSecondaryBackgroundColor={true}
              buttonWidth={150}
              icon={<TuneIcon />}
            />
            <FilteringDialog
              modalOpen={modalOpen}
              toggleFilteringModal={toggleFilteringModal}
            />
            <div className={style.hotelsContainerWithoutSideBar}>
              <Hotel />
            </div>
          </div>
        ) : (
          <div className={style.searchContainerWithSideBar}>
            <div className={style.filterSideBarContainer}>
              <FilteringContent/>
            </div>
            <div className={style.hotelsContainer}>
              <Hotel />
            </div>
          </div>
        )}
      </Box>
    </div>
  );
}
