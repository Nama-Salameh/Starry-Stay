import React, { useState, useEffect } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import {
  addHotelImage,
  createHotel,
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
import SmallButton from "../../../components/common/Buttons/SmallButton.component";
import style from "../Admin.module.css";
import { getCities } from "../../../services/cities/Cities.service";
import { SlidingWindow } from "../../../components/common/slidingWindow/SildingWindow.component";

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

type City = {
  id: number;
  name: string;
  description: string;
};
const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
  hotelToEditNotFound: localization.hotelToEditNotFound,
  hotelsNotFound: localization.hotelsNotFound,
  searchTimedout: localization.searchTimedout,
  gettingHotelImageFailed: localization.gettingHotelImageFailed,
  citiesNotFound: localization.citiesNotFound,
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
  const [hotelData, setHotelData] = useState<{
    hotelName: string;
    description: string;
    hoteltype: number;
    starRating: number;
    latitude: number;
    longitude: number;
    cities: City[] | null;
    hotelId?: number;
  } | null>(null);
  const [citiesInfo, setCitiesInfo] = useState<City[] | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
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
    const fetchCities = async () => {
      try {
        const citiesInfo = await getCities();
        setCitiesInfo(citiesInfo);
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
          case ErrorTypes.NotFound:
            notifyError(errorMessages.citiesNotFound);
            break;
        }
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
      console.log("id", hotelId, "hotel info : ", hotelInfo);
      const initialValues = {
        hotelName: hotelInfo.hotelName,
        description: hotelInfo.description,
        hoteltype: 0, // Adjust this value as needed
        starRating: hotelInfo.starRating,
        latitude: hotelInfo.latitude,
        longitude: hotelInfo.longitude,
        cities: citiesInfo ? citiesInfo : null,
        hotelId: hotelId,
      };

      console.log("initial values:", initialValues);

      setHotelData(initialValues);
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

  const handleCreateHotelClick = async () => {
    setCreateFormOpen(true);
  };
  const handleConfirmCreate = async (
    name: string,
    description: string,
    starRating: number,
    latitude: number,
    longitude: number,
    hotelType: any,
    cityId: any,
    imageFile: any
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
      if (imageFile) {
        try {
          await addHotelImage(newHotel.id, imageFile);
        } catch {
          notifyError(errorMessages.gettingHotelImageFailed);
        }
      }
      const updatedHotels = await getHotels();
      setHotelsInfo(updatedHotels);
      notifySuccess(successMessages.successCreate);
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
    setCreateFormOpen(false);
    setHotelData(null);
  };
  const handleCancelCreate = () => {
    setCreateFormOpen(false);
    setHotelData(null);
  };
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
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
      <TableWithNavigation
        data={hotelsInfo}
        itemsPerPage={5}
        onDelete={handleDeleteHotel}
        onEdit={handleEditHotelClick}
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
          }}
          isCreateMode={false}
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
          }}
          isCreateMode={true}
        />
      </SlidingWindow>
    </Box>
  );
}
