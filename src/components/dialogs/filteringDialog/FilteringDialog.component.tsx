import React from "react";
import { Dialog } from "@mui/material";
import FilteringContent from "../../searchComponents/FilteringContent.component";
import style from './FilteringDialog.module.css'

const FilteringDialog: React.FC<{ modalOpen: boolean; toggleFilteringModal: () => void }> = ({ modalOpen, toggleFilteringModal }) => {
  return (
    <Dialog
      open={modalOpen}
      onClose={toggleFilteringModal}
      PaperProps={{ className: style.filteringModal }}
    >
      <FilteringContent />
    </Dialog>
  );
}
export default FilteringDialog;