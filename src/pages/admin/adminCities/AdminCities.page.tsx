import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import {
  deleteCityByItsId,
  getCities,
} from "../../../services/cities/Cities.service";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal.component";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastUtils/Toast.utils";

export default function AdminCities() {
  const [citiesInfo, setcitiesInfo] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<number | null>(null);

  useEffect(() => {
    const getCitiesInfo = async () => {
      try {
        const citiesInfo = await getCities();
        setcitiesInfo(citiesInfo);
      } catch (error) {
        notifyError("No data availble now");
      }
    };
    getCitiesInfo();
  }, []);
  console.log("cities Info : ", citiesInfo);
  const handleSearch = (searchText: string) => {};
  const handleDeleteCity = async (cityId: number) => {
    setIsDeleteModalOpen(true);
    setCityToDelete(cityId);
  };

  const handleConfirmDelete = async () => {
    if (cityToDelete !== null) {
      try {
        await deleteCityByItsId(cityToDelete);
        notifySuccess("The city deleted successfully");
      } catch {
        notifyError("Deleting a city Failed, Try again");
      }
    }

    setIsDeleteModalOpen(false);
    setCityToDelete(null);
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setCityToDelete(null);
  };
  const handleEditCity = () => {};

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      <SearchBar onSearch={handleSearch} />
      <TableWithNavigation
        data={citiesInfo}
        itemsPerPage={5}
        onDelete={handleDeleteCity}
        onEdit={handleEditCity}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
}
