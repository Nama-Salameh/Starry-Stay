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
import { handleError } from "../../../services/ApisConfig";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastUtils/Toast.utils";
import HotelForm from "../../../components/common/forms/hotelForm/HotelForm.component";
import IHotel from "../../../interfaces/IHotel.interface";

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
  avaiablrRomms: number;
  imageUrl: string;
};

export default function AdminHotels() {
  const [hotelsInfo, setHotelsInfo] = useState();
  const [selectedOption, setSelectedOption] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");
  const [isFormOpen, setFormOpen] = useState(false);
  const [hotelData, setHotelData] = useState<Hotel | null>(null);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const results = await getHotels();
        setHotelsInfo(results);
      } catch (error) {
        let { message, type } = handleError(error);
        throw { message, type };
      }
    };

    fetchSearchResults();
  }, []);
  console.log("hotels info :", hotelsInfo);

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
    } catch (error) {
      notifyError("Something happen while searching for a hotel, try again");
    }
  };

  const handleDeleteHotel = () => {};

  const handleEditHotelClick = async (hotelId: number) => {
    try {
      const hotelInfo = await getHotelInfoByItsId(hotelId);
      console.log("hotel Info ", hotelInfo);
      console.log("hotel Data ", hotelData);
      console.log("doing");

      setHotelData(hotelInfo);
      console.log("hotel Info ", hotelInfo);
      console.log("hotel Data ", hotelData);
      setFormOpen(true);
    } catch (error) {
      notifyError("Failed to fetch city data. Please try again.");
    }
  };
  const handleCancelEdit = () => {
    setFormOpen(false);
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
        notifySuccess("The hotel updated successfully");
      } else {
        notifyError("Updating a hotel Failed. Please Try again");
      }
    } catch {
      notifyError("Updating a hotel Failed. Please Try again");
    }
    setFormOpen(false);
    setHotelData(null);
  };
  useEffect(() => {
    console.log("hotelData after update:", hotelData);
  }, [hotelData]);

  console.log("hotel Data ", hotelData);

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
        isOpen={isFormOpen}
        onCancel={handleCancelEdit}
        onSubmit={handleConfirmUpdate}
        initialValues={{
          name: hotelData ? hotelData.hotelName : "",
          description: hotelData ? hotelData.description : "",
          hoteltype: 0,
          starrating: hotelData ? hotelData.starRating : 0,
          latitude: hotelData ? hotelData.latitude : 0,
          longitude: hotelData ? hotelData.longitude : 0,
          imageFile: null,
          
        }}
      />
    </Box>
  );
}
