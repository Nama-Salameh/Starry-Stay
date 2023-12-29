import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import {
  deleteCityByItsId,
  getCities,
  getCityByItsId,
  updateCity,
} from "../../../services/cities/Cities.service";
import DeleteConfirmationModal from "../../../components/modals/DeleteConfirmationModal.component";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastUtils/Toast.utils";
import EditForm from "../../../components/common/forms/editForm/EditFrom.component";

export default function AdminCities() {
  const [citiesInfo, setcitiesInfo] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<number | null>(null);
  const [isEditFormOpen, setEditFormOpen] = useState(false);
  const [editedData, setEditedData] = useState(null);

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

  const handleEditCity = async (cityId: number) => {
    try {
      const cityInfo = await getCityByItsId(cityId);
      setEditedData(cityInfo);
      setEditFormOpen(true);
    } catch (error) {
      notifyError("Failed to fetch city data. Please try again.");
    }
  };

  const handleCancelEdit = () => {
    setEditFormOpen(false);
    setEditedData(null);
  };
  const handleUpdate = async (
    cityId: number,
    name: string,
    description: string
  ) => {
    try {
      await updateCity(cityId, name, description);
      const updatedCities = await getCities();
      setcitiesInfo(updatedCities);
      notifySuccess("The city updated successfully");
    } catch {
      notifyError("Updating a city Failed. Please Try again");
    }
    setEditFormOpen(false);
    setEditedData(null);
  };
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
      <EditForm
        isOpen={isEditFormOpen}
        onCancel={handleCancelEdit}
        onUpdate={handleUpdate}
        cityInfo={editedData}
      />
    </Box>
  );
}
