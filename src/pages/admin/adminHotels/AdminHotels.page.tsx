import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box, CircularProgress } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import {
  addAmenityToHotel,
  addHotelImage,
  createHotel,
  deleteHotel,
  getFilteredHotels,
  getHotelAmenitiesByItsId,
  getHotelInfoByItsId,
  getHotels,
  removeAmenityFromHotel,
  updateHotel,
} from "../../../services/hotels/Hotels.service";
import { notifySuccess } from "../../../utils/toastUtils/Toast.utils";
import HotelForm from "../../../components/common/forms/hotelForm/HotelForm.component";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import SmallButton from "../../../components/common/Buttons/SmallButton.component";
import style from "../Admin.module.css";
import { getCities } from "../../../services/cities/Cities.service";
import { SlidingWindow } from "../../../components/common/slidingWindow/SildingWindow.component";
import DeleteConfirmationModal from "../../../components/modals/deleteConfirmationModal/DeleteConfirmationModal.component";
import TableWithPagination from "../../../components/common/table/TableWithPagination.component";
import { addAmenityToRoom } from "../../../services/rooms/Rooms.service";
import handleErrorType from "../../../utils/handleErrorUtils/HnadleError.utils";
import ICity from "../../../interfaces/ICity.interface";
import IHotelInfo from "../../../interfaces/IHotelInfo.interface";

type HotelAmenityForCreate = {
  name: string;
  description: string;
};
type HotelAmenity = HotelAmenityForCreate & {
  id: number;
};

const errorMessages = {
  hotelToEditNotFound: localization.hotelToEditNotFound,
  hotelsNotFound: localization.hotelsNotFound,
  searchTimedout: localization.searchTimedout,
  gettingHotelImageFailed: localization.gettingHotelImageFailed,
  citiesNotFound: localization.citiesNotFound,
  hotelToDeleteNotFound: localization.hotelToDeleteNotFound,
  hotelNotFound: localization.hotelNotFound,
};

const successMessages = {
  successUpdate: localization.hotelUpdatedSuccessfully,
  successDelete: localization.hotelDeletedSuccessfully,
  successCreate: localization.hotelCreatedSuccessfully,
};

export default function AdminHotels() {
  const [hotelsInfo, setHotelsInfo] = useState();
  const [selectedOption, setSelectedOption] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [hotelToDelete, setHotelToDelete] = useState<number | null>(null);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [hotelData, setHotelData] = useState<{
    hotelName: string;
    description: string;
    hoteltype: number;
    starRating: number;
    latitude: number;
    longitude: number;
    cities: ICity[] | null;
    hotelId?: number;
  } | null>(null);
  const [citiesInfo, setCitiesInfo] = useState<ICity[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hotelAmenities, setHotelAmenities] = useState<HotelAmenity[]>([]);

  useEffect(() => {
    document.title = localization.adminHotelsPageTitle;
  });

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const results = await getHotels();
        setHotelsInfo(results);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.hotelsNotFound,
        });
      }
    };
    const fetchCities = async () => {
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

    fetchHotels();
    fetchCities();
  }, []);

  const handleDebouncedSearch = async () => {
    try {
      let filteredCities;
      if (selectedOption === "name") {
        filteredCities = await getFilteredHotels({ name: searchText });
      } else if (selectedOption === "description") {
        filteredCities = await getFilteredHotels({ searchQuery: searchText });
      } else {
        filteredCities = await getHotels();
      }
      setHotelsInfo(filteredCities);
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        timeout: errorMessages.searchTimedout,
      });
    }
  };

  const handleDeleteHotelClick = async (hotelId: number) => {
    setIsDeleteModalOpen(true);
    setHotelToDelete(hotelId);
  };
  const handleConfirmDelete = async () => {
    if (hotelToDelete !== null) {
      try {
        const hotelInfo = (await getHotelInfoByItsId(
          hotelToDelete
        )) as IHotelInfo;
        await deleteHotel(hotelToDelete, hotelInfo.cityId);
        notifySuccess(successMessages.successDelete);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.hotelToDeleteNotFound,
        });
      }
    }
    setIsDeleteModalOpen(false);
    setHotelToDelete(null);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setHotelToDelete(null);
  };
  const handleEditHotelClick = async (hotelId: number) => {
    try {
      const hotelInfo = await getHotelInfoByItsId(hotelId);
      const initialValues = {
        hotelName: hotelInfo.hotelName,
        description: hotelInfo.description,
        hoteltype: 0,
        starRating: hotelInfo.starRating,
        latitude: hotelInfo.latitude,
        longitude: hotelInfo.longitude,
        cities: citiesInfo ? citiesInfo : null,
        hotelId: hotelId,
      };

      setHotelData(initialValues);
      const hotelAmenities = await getHotelAmenitiesByItsId(hotelId);
      setHotelAmenities(hotelAmenities);
      setUpdateFormOpen(true);
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        notFound: errorMessages.hotelToEditNotFound,
      });
    }
  };
  const handleCancelEdit = () => {
    setUpdateFormOpen(false);
    setHotelData(null);
  };
  const handleConfirmUpdate = async (
    name: string,
    description: string,
    starRating: number,
    latitude: number,
    longitude: number,
    hotelId: number
  ) => {
    try {
      if (typeof hotelId === "number") {
        await handleAmenitiesChange(hotelId, hotelAmenities);
        await updateHotel(
          hotelId,
          name,
          description,
          starRating,
          latitude,
          longitude
        );
        const updatedCities = await getHotels();
        setHotelsInfo(updatedCities);
        notifySuccess(successMessages.successUpdate);
      }
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes, {
        notFound: errorMessages.hotelToEditNotFound,
      });
    }
    setUpdateFormOpen(false);
    setHotelData(null);
  };

  const handleCreateHotelClick = async () => {
    setCreateFormOpen(true);
  };
  const handleConfirmCreate = async (
    name: string,
    description: string,
    starRating: number,
    latitude: number,
    longitude: number,
    hotelType: number,
    cityId: number,
    images: File[] | null,
    amenities: HotelAmenityForCreate[] | null
  ) => {
    try {
      const newHotel = await createHotel(
        cityId,
        name,
        description,
        hotelType,
        starRating,
        latitude,
        longitude
      );
      if (images && images.length > 0) {
        for (const imageFile of images) {
          try {
            await addHotelImage(newHotel.id, imageFile);
          } catch (errorType) {
            handleErrorType(errorType as ErrorTypes, {
              notFound: errorMessages.hotelNotFound,
            });
          }
        }
      }
      if (amenities && newHotel && amenities.length > 0) {
        const hotelId = newHotel.id;
        for (const amenity of amenities) {
          await addAmenityToRoom(hotelId, amenity.name, amenity.description);
        }
      }
      const updatedHotels = await getHotels();
      setHotelsInfo(updatedHotels);
      notifySuccess(successMessages.successCreate);
      setCreateFormOpen(false);
      setHotelData(null);
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes);
    }
  };
  const handleCancelCreate = () => {
    setCreateFormOpen(false);
    setHotelData(null);
  };
  const handleAmenitiesChange = async (
    hotelId: number,
    amenities: HotelAmenityForCreate[] | HotelAmenity[]
  ) => {
    try {
      const existingAmenities = await getHotelAmenitiesByItsId(hotelId);
      const amenitiesToRemove = existingAmenities.filter(
        (existingAmenity: HotelAmenity) =>
          !amenities.some((a) => a.name === existingAmenity.name)
      );

      const amenitiesToAdd = amenities.filter(
        (newAmenity) =>
          !existingAmenities.some(
            (a: HotelAmenityForCreate) => a.name === newAmenity.name
          )
      );
      for (const amenityToRemove of amenitiesToRemove) {
        await removeAmenityFromHotel(hotelId, amenityToRemove.id);
      }

      for (const amenityToAdd of amenitiesToAdd) {
        await addAmenityToHotel(
          hotelId,
          amenityToAdd.name,
          amenityToAdd.description
        );
      }
    } catch (errorType) {
      handleErrorType(errorType as ErrorTypes);
    }
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
                value={localization.createHotel}
                buttonWidth={140}
                onClick={handleCreateHotelClick}
              />
            </div>
          </div>
          <TableWithPagination
            data={hotelsInfo}
            itemsPerPage={5}
            onDelete={handleDeleteHotelClick}
            onEdit={handleEditHotelClick}
          />
          <DeleteConfirmationModal
            isOpen={isDeleteModalOpen}
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
          <SlidingWindow isOpen={isUpdateFormOpen} onClose={handleCancelEdit}>
            <HotelForm
              onCancel={handleCancelEdit}
              onSubmit={handleConfirmUpdate}
              initialValues={{
                name: hotelData ? hotelData.hotelName : "",
                description: hotelData ? hotelData.description : "",
                hoteltype: 0,
                starrating: hotelData ? hotelData.starRating : 0,
                latitude: hotelData ? hotelData.latitude : 0,
                longitude: hotelData ? hotelData.longitude : 0,
                cities: citiesInfo ? citiesInfo : null,
                hotelId: hotelData ? hotelData.hotelId : undefined,
                amenities: hotelAmenities,
              }}
              isCreateMode={false}
              onAmenitiesChange={handleAmenitiesChange}
            />
          </SlidingWindow>
          <SlidingWindow isOpen={isCreateFormOpen} onClose={handleCancelEdit}>
            <HotelForm
              onCancel={handleCancelCreate}
              onSubmit={handleConfirmCreate}
              initialValues={{
                name: "",
                description: "",
                hoteltype: 0,
                starrating: 0,
                latitude: 0,
                longitude: 0,
                cities: citiesInfo ? citiesInfo : null,
                cityId: null,
                amenities: [],
              }}
              isCreateMode={true}
            />
          </SlidingWindow>
        </div>
      )}
    </Box>
  );
}
