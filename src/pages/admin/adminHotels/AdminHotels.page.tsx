import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import {
  getFilteredHotels,
  getHotelInfoByItsId,
  getHotels,
  updateHotel,
} from "../../../services/hotels/Hotels.service";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastUtils/Toast.utils";
import HotelForm from "../../../components/common/forms/hotelForm/HotelForm.component";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";

type Hotel = {
  hotelName: string;
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  amenities: [
    {
      id: number;
      name: string;
      description: string;
    }
  ];
  starRating: number;
  avaiableRooms: number;
  imageUrl: string;
  id?: number;
};

const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
  hotelToEditNotFound: localization.hotelToEditNotFound,
  hotelsNotFound: localization.hotelsNotFound,
  searchTimedout: localization.searchTimedout,
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
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [hotelData, setHotelData] = useState<Hotel | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await getHotels();
        setHotelsInfo(results);
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
          case ErrorTypes.NotFound:
            notifyError(errorMessages.hotelsNotFound);
            break;
        }
      }
    };

    fetchSearchResults();
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
      switch (errorType) {
        case ErrorTypes.Network:
          notifyError(errorMessages.network);
          break;
        case ErrorTypes.Timeout:
          notifyError(errorMessages.searchTimedout);
          break;
        case ErrorTypes.Unknown:
          notifyError(errorMessages.unknown);
          break;
      }
    }
  };

  const handleDeleteHotel = () => {};

  const handleEditHotelClick = async (hotelId: number) => {
    try {
      const hotelInfo = await getHotelInfoByItsId(hotelId);
      setHotelData({ ...hotelInfo, id: hotelId });
      setUpdateFormOpen(true);
    } catch (errorType) {
      switch (errorType) {
        case ErrorTypes.Network:
          notifyError(errorMessages.network);
          break;
        case ErrorTypes.Unknown:
          notifyError(errorMessages.unknown);
          break;
        case ErrorTypes.NotFound:
          notifyError(errorMessages.hotelToEditNotFound);
          break;
      }
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
    hotelId: any
  ) => {
    try {
      if (typeof hotelId === "number") {
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
      switch (errorType) {
        case ErrorTypes.Network:
          notifyError(errorMessages.network);
          break;
        case ErrorTypes.Unknown:
          notifyError(errorMessages.unknown);
          break;
        case ErrorTypes.NotFound:
          notifyError(errorMessages.hotelToEditNotFound);
          break;
      }
    }
    setUpdateFormOpen(false);
    setHotelData(null);
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      <SearchBar
        onSearch={handleDebouncedSearch}
        selectedOption={selectedOption}
        onOptionChange={setSelectedOption}
        searchText={searchText}
        onTextChange={setSearchText}
      />
      <TableWithNavigation
        data={hotelsInfo}
        itemsPerPage={5}
        onDelete={handleDeleteHotel}
        onEdit={handleEditHotelClick}
      />
      <HotelForm
        isOpen={isUpdateFormOpen}
        onCancel={handleCancelEdit}
        onSubmit={handleConfirmUpdate}
        initialValues={{
          name: hotelData ? hotelData.hotelName : "",
          description: hotelData ? hotelData.description : "",
          hoteltype: 0,
          starrating: hotelData ? hotelData.starRating : 0,
          latitude: hotelData ? hotelData.latitude : 0,
          longitude: hotelData ? hotelData.longitude : 0,
          hotelId: hotelData ? hotelData.id : undefined,
        }}
      />
    </Box>
  );
}
