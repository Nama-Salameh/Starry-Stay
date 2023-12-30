import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import {
  createCity,
  deleteCityByItsId,
  getCities,
  getCityByItsId,
  updateCity,
} from "../../../services/cities/Cities.service";
import DeleteConfirmationModal from "../../../components/modals/deleteConfirmationModal/DeleteConfirmationModal.component";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastUtils/Toast.utils";
import CityForm from "../../../components/common/forms/cityForm/CityFrom.component";
import SmallButton from "../../../components/common/Buttons/SmallButton.component";
import style from "../Admin.module.css";

export default function AdminCities() {
  const [citiesInfo, setcitiesInfo] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<number | null>(null);
  const [isFormOpen, setFormOpen] = useState(false);
  const [cityData, setCityData] = useState(null);

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

  const handleDeleteCityClick = async (cityId: number) => {
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

  const handleEditCityClick = async (cityId: number) => {
    try {
      const cityInfo = await getCityByItsId(cityId);
      setCityData(cityInfo);
      setFormOpen(true);
    } catch (error) {
      notifyError("Failed to fetch city data. Please try again.");
    }
  };
  const handleCancelEdit = () => {
    setFormOpen(false);
    setCityData(null);
  };
  const handleConfirmUpdate = async (
    name: string,
    description: string,
    cityId: any
  ) => {
    try {
      if (typeof cityId === "number") {
        await updateCity(cityId, name, description);
        const updatedCities = await getCities();
        setcitiesInfo(updatedCities);
        notifySuccess("The city updated successfully");
      } else {
        notifyError("Updating a city Failed. Please Try again");
      }
    } catch {
      notifyError("Updating a city Failed. Please Try again");
    }
    setFormOpen(false);
    setCityData(null);
  };

  const handleCreateCityClick = async () => {
    setFormOpen(true);
  };
  const handleConfirmCreate = async (name: string, description: string) => {
    try {
      await createCity(name, description);
      const updatedCities = await getCities();
      setcitiesInfo(updatedCities);
      notifySuccess("The city created successfully");
    } catch {
      notifyError("Creating a city Failed. Please Try again");
    }
    setFormOpen(false);
    setCityData(null);
  };
  const handleCancelCreate = () => {
    setFormOpen(false);
    setCityData(null);
  };
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      <div className={style.pageHeader}>
        <SearchBar onSearch={handleSearch} />
        <SmallButton
          value={localization.create}
          buttonWidth={100}
          onClick={handleCreateCityClick}
        />
      </div>
      <TableWithNavigation
        data={citiesInfo}
        itemsPerPage={5}
        onDelete={handleDeleteCityClick}
        onEdit={handleEditCityClick}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <CityForm
        isOpen={isFormOpen}
        onCancel={handleCancelEdit}
        onSubmit={handleConfirmUpdate}
        initialValues={cityData || { name: "", description: "" }}
      />
      <CityForm
        isOpen={isFormOpen}
        onCancel={handleCancelCreate}
        onSubmit={handleConfirmCreate}
        initialValues={cityData || { name: "", description: "" }}
        isCreateMode={true}
      />
    </Box>
  );
}
