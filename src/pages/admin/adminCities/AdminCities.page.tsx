import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import {
  addCityImage,
  createCity,
  deleteCityByItsId,
  getCities,
  getCityByItsId,
  getFilteredCities,
  updateCity,
} from "../../../services/cities/Cities.service";
import DeleteConfirmationModal from "../../../components/modals/deleteConfirmationModal/DeleteConfirmationModal.component";
import { notifySuccess } from "../../../utils/toastUtils/Toast.utils";
import CityForm from "../../../components/common/forms/cityForm/CityFrom.component";
import SmallButton from "../../../components/common/Buttons/SmallButton.component";
import style from "../Admin.module.css";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import { SlidingWindow } from "../../../components/common/slidingWindow/SildingWindow.component";
import CircularProgress from "@mui/material/CircularProgress";
import TableWithPagination from "../../../components/common/table/TableWithPagination.component";
import handleErrorType from "../../../utils/handleErrorUtils/HnadleError.utils";

interface CityData {
  id?: number;
  name: string;
  description: string;
}

const errorMessages = {
  cityToEditNotFound: localization.cityToEditNotFound,
  citiesNotFound: localization.citiesNotFound,
  searchTimedout: localization.searchTimedout,
  cityToDeleteNotFound: localization.cityToDeleteNotFound,
  gettingCityImageFailed: localization.gettingCityImageFailed,
  cityNotFound: localization.cityNotFound,
};
const successMessages = {
  successUpdate: localization.cityUpdatedSuccessfully,
  successDelete: localization.cityDeletedSuccessfully,
  successCreate: localization.cityCreatedSuccessfully,
};
export default function AdminCities() {
  const [citiesInfo, setCitiesInfo] = useState();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [cityToDelete, setCityToDelete] = useState<number | null>(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = localization.adminCitiesPageTitle;
  });
  useEffect(() => {
    const getCitiesInfo = async () => {
      try {
        const citiesInfo = await getCities();
        setCitiesInfo(citiesInfo);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.citiesNotFound,
        });
      } finally {
        setIsLoading(false);
      }
    };
    getCitiesInfo();
  }, []);

  const handleDebouncedSearch = async () => {
    try {
      let filteredCities;
      if (selectedOption === "name") {
        filteredCities = await getFilteredCities({ name: searchText });
      } else if (selectedOption === "description") {
        filteredCities = await getFilteredCities({ searchQuery: searchText });
      } else {
        filteredCities = await getCities();
      }
      setCitiesInfo(filteredCities);
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        timeout: errorMessages.searchTimedout,
      });
    }
  };

  const handleDeleteCityClick = async (cityId: number) => {
    setIsDeleteModalOpen(true);
    setCityToDelete(cityId);
  };
  const handleConfirmDelete = async () => {
    if (cityToDelete !== null) {
      try {
        await deleteCityByItsId(cityToDelete);
        notifySuccess(successMessages.successDelete);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.cityToDeleteNotFound,
        });
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
      setUpdateFormOpen(true);
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        notFound: errorMessages.cityToEditNotFound,
      });
    }
  };

  const handleCancelEdit = () => {
    setUpdateFormOpen(false);
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
        setCitiesInfo(updatedCities);
        notifySuccess(successMessages.successUpdate);
      }
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        notFound: errorMessages.cityToEditNotFound,
      });
    }
    setUpdateFormOpen(false);
    setCityData(null);
  };

  const handleCreateCityClick = async () => {
    setCreateFormOpen(true);
  };
  const handleConfirmCreate = async (
    name: string,
    description: string,
    images: File[] | null
  ) => {
    try {
      const newCity = await createCity(name, description);
      if (images && images.length > 0) {
        for (const imageFile of images) {
          try {
            await addCityImage(newCity.id, imageFile);
          } catch (errorType) {
            handleErrorType(errorType as ErrorTypes, {
              notFound: errorMessages.cityNotFound,
            });
          }
        }
        const updatedCities = await getCities();
        setCitiesInfo(updatedCities);
        notifySuccess(successMessages.successCreate);
      }
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes);
    }
    setCreateFormOpen(false);
    setCityData(null);
  };
  const handleCancelCreate = () => {
    setCreateFormOpen(false);
    setCityData(null);
  };
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>{localization.loading}</span>
        </div>
      )}
      {!isLoading && (
        <div>
          <div className={style.pageHeader}>
            <SearchBar
              onSearch={handleDebouncedSearch}
              selectedOption={selectedOption}
              onOptionChange={setSelectedOption}
              searchText={searchText}
              onTextChange={setSearchText}
            />
            <div className={style.buttonContainer}>
              <SmallButton
                value={localization.createCity}
                buttonWidth={140}
                onClick={handleCreateCityClick}
              />
            </div>
          </div>
          <TableWithPagination
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
          <SlidingWindow isOpen={isUpdateFormOpen} onClose={handleCancelEdit}>
            <CityForm
              onCancel={handleCancelEdit}
              onSubmit={handleConfirmUpdate}
              initialValues={{
                name: cityData ? cityData.name : "",
                description: cityData ? cityData.description : "",
                cityId: cityData ? cityData.id : undefined,
              }}
              isCreateMode={false}
            />
          </SlidingWindow>
          <SlidingWindow isOpen={isCreateFormOpen} onClose={handleCancelEdit}>
            <CityForm
              onCancel={handleCancelCreate}
              onSubmit={handleConfirmCreate}
              initialValues={{
                name: cityData ? cityData.name : "",
                description: cityData ? cityData.description : "",
                imageFile: null,
              }}
              isCreateMode={true}
            />
          </SlidingWindow>
        </div>
      )}
    </Box>
  );
}
