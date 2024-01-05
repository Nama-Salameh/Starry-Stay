import React, { useEffect, useState } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import SmallButton from "../../../components/common/Buttons/SmallButton.component";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import style from "../Admin.module.css";
import { notifyError } from "../../../utils/toastUtils/Toast.utils";
import {
  getHotelRoomsByItsId,
  getHotels,
} from "../../../services/hotels/Hotels.service";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";

type Hotel = {
  id: number;
  name: string;
  description: string;
  hotelType: number;
  starRating: number;
  latitude: number;
  longitude: number;
};

type Room = {
  id: number;
  roomPhotoUrl: string;
  roomType: string;
  capacityOfAdults: number;
  capacityOfChildren: number;
  roomAmenities: [
    {
      name: string;
      description: string;
    }
  ];
  price: number;
  availability: boolean;
};
type RoomWithHotelId = Room & {
  hotelId: number;
};
const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
  roomToEditNotFound: localization.roomToEditNotFound,
  hotelsNotFound: localization.hotelsNotFound,
  roomsNotFound: localization.roomsNotFound,
  searchTimedout: localization.searchTimedout,
  gettingRoomImageFailed: localization.gettingRoomImageFailed,
};

const successMessages = {
  successUpdate: localization.roomUpdatedSuccessfully,
  successDelete: localization.roomDeletedSuccessfully,
  successCreate: localization.roomCreatedSuccessfully,
};

const handleDebouncedSearch = (searchText: string) => {};
const handleDeleteRoom = () => {};
const handleCreateRoomClick = () => {};
const handleEditRoomClick = () => {};

export default function AdminRooms() {
  const [hotelsInfo, setHotelsInfo] = useState<Hotel[]>([]);
  const [RoomsInfoWithoutHotelId, setRoomsInfoWithoutHotelId] = useState<
    Room[]
  >([]);
  const [RoomsInfoWithHotelId, setRoomsInfoWithHotelId] = useState<
    RoomWithHotelId[]
  >([]);
  const [selectedOption, setSelectedOption] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotels: Hotel[] = await getHotels();
        setHotelsInfo(hotels);

        const roomsWithHotelId: RoomWithHotelId[] = [];
        const roomsWithoutHotelId: Room[] = [];

        await Promise.all(
          hotels.map(async (hotel: Hotel) => {
            const hotelRooms = await getHotelRoomsByItsId(
              hotel.id,
              "2024-1-1",
              "2024-1-30"
            );
            const roomsForHotelWithHotelId = hotelRooms.map((room: Room) => ({
              ...room,
              hotelId: hotel.id,
            }));
            roomsWithHotelId.push(...roomsForHotelWithHotelId);
            roomsWithoutHotelId.push(...hotelRooms);
          })
        );

        setRoomsInfoWithHotelId(roomsWithHotelId);
        setRoomsInfoWithoutHotelId(roomsWithoutHotelId);
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
    fetchData();
  }, []);

  console.log("hotels info", hotelsInfo);
  console.log("rooms without", RoomsInfoWithoutHotelId);
  console.log("rooms with", RoomsInfoWithHotelId);
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
            value={localization.createRoom}
            buttonWidth={140}
            onClick={handleCreateRoomClick}
          />
        </div>
      </div>
      <TableWithNavigation
        data={RoomsInfoWithoutHotelId}
        itemsPerPage={5}
        onDelete={handleDeleteRoom}
        onEdit={handleEditRoomClick}
      />
    </Box>
  );
}
