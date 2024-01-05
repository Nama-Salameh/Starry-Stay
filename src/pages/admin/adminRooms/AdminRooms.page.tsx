import React, { useEffect, useState } from "react";
import localization from "../../../localizationConfig";
import { Box } from "@mui/material";
import SearchBar from "../../../components/bars/admin/serachBar/SearchBar.component";
import SmallButton from "../../../components/common/Buttons/SmallButton.component";
import TableWithNavigation from "../../../components/common/table/TableWithPagination.component";
import style from "../Admin.module.css";
import {
  notifyError,
  notifySuccess,
} from "../../../utils/toastUtils/Toast.utils";
import {
  getHotelRoomsByItsId,
  getHotels,
} from "../../../services/hotels/Hotels.service";
import { ErrorTypes } from "../../../enums/ErrorTypes.enum";
import {
  deleteRoom,
  getRoomInfoByItsId,
  updateRoom,
} from "../../../services/rooms/Rooms.service";
import DeleteConfirmationModal from "../../../components/modals/deleteConfirmationModal/DeleteConfirmationModal.component";
import { SlidingWindow } from "../../../components/common/slidingWindow/SildingWindow.component";
import RoomForm from "../../../components/common/forms/roomForm/RoomForm.component";

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
type RoomToEditOrCreate = {
  roomNumber: number;
  cost: number;
  roomId: number;
};
const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
  roomToEditNotFound: localization.roomToEditNotFound,
  hotelsNotFound: localization.hotelsNotFound,
  roomsNotFound: localization.roomsNotFound,
  searchTimedout: localization.searchTimedout,
  gettingRoomImageFailed: localization.gettingRoomImageFailed,
  roomToDeleteNotFound: localization.roomToDeleteNotFound,
};

const successMessages = {
  successUpdate: localization.roomUpdatedSuccessfully,
  successDelete: localization.roomDeletedSuccessfully,
  successCreate: localization.roomCreatedSuccessfully,
};

export default function AdminRooms() {
  const [hotelsInfo, setHotelsInfo] = useState<Hotel[]>([]);
  const [RoomsInfoWithHotelId, setRoomsInfoWithHotelId] = useState<
    RoomWithHotelId[]
  >([]);
  const [roomData, setRoomData] = useState<RoomToEditOrCreate | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>("name");
  const [searchText, setSearchText] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<{
    id: number;
    relatedId: number;
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotels: Hotel[] = await getHotels();
        setHotelsInfo(hotels);

        const roomsWithHotelId: RoomWithHotelId[] = [];

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
          })
        );

        setRoomsInfoWithHotelId(roomsWithHotelId);
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

  const handleDebouncedSearch = (searchText: string) => {};

  const handleDeleteRoomClick = async (params: {
    id: number;
    relatedId: any;
  }) => {
    setIsDeleteModalOpen(true);
    setRoomToDelete(params);
  };
  const handleConfirmDelete = async () => {
    if (roomToDelete !== null) {
      try {
        await deleteRoom(roomToDelete.id, roomToDelete.relatedId);
        notifySuccess(successMessages.successDelete);
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
          case ErrorTypes.NotFound:
            notifyError(errorMessages.roomToDeleteNotFound);
            break;
        }
      }
    }
    setIsDeleteModalOpen(false);
    setRoomToDelete(null);
  };
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
    setRoomToDelete(null);
  };

  const handleCreateRoomClick = () => {};

  const handleEditRoomClick = async (roomId: number) => {
    
    console.log("roomId:", roomId); 
    try {
      const roomInfo = await getRoomInfoByItsId(roomId);
      setRoomData({ ...roomInfo, id: roomId });  // Add 'id' property
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
          notifyError(errorMessages.roomToEditNotFound);
          break;
      }
    }
  };

  const handleCancelEdit = async () => {
    setUpdateFormOpen(false);
    setRoomData(null);
  };
  const handleConfirmUpdate = async (
    roomNumber: number,
    cost: number,
    roomId: number
  ) => {
    try {
      if (typeof roomId === "number") {
        await updateRoom(roomId, roomNumber, cost);
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
          notifyError(errorMessages.roomToEditNotFound);
          break;
      }
    }
    setUpdateFormOpen(false);
    setRoomData(null);
  };

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
        data={RoomsInfoWithHotelId}
        itemsPerPage={5}
        onDelete={({ id, relatedId }) =>
          handleDeleteRoomClick({ id, relatedId })
        }
        onEdit={handleEditRoomClick}
      />
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
      <SlidingWindow isOpen={isUpdateFormOpen} onClose={handleCancelEdit}>
        <RoomForm
          onCancel={handleCancelEdit}
          onSubmit={handleConfirmUpdate}
          initialValues={{
            roomNumber: roomData ? roomData.roomNumber : null,
            cost: roomData ? roomData.cost : null,
            roomId: roomData ? roomData.roomId : null,
          }}
          isCreateMode={false}
        />
      </SlidingWindow>
    </Box>
  );
}
