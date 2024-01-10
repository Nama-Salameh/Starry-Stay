import React, { useEffect, useState } from "react";
import localization from "../../../localizationConfig";
import { Box, CircularProgress, MenuItem, Select } from "@mui/material";
import SmallButton from "../../../components/common/Buttons/SmallButton.component";
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
import TableWithPagination from "../../../components/common/table/TableWithPagination.component";

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
  roomNumber: number;
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
  const [roomData, setRoomData] = useState<RoomToEditOrCreate | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateFormOpen, setUpdateFormOpen] = useState(false);
  const [isCreateFormOpen, setCreateFormOpen] = useState(false);
  const [roomToDelete, setRoomToDelete] = useState<number | null>(null);
  const [selectedHotel, setSelectedHotel] = useState<number | null>(null);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = localization.adminRoomsPageTitle;
  });

  useEffect(() => {
    const fetchHotelsAndSetDefault = async () => {
      try {
        const hotels: Hotel[] = await getHotels();
        setHotelsInfo(hotels);
        setSelectedHotel(hotels.length > 0 ? hotels[0].id : null);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchHotelsAndSetDefault();
  }, []);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        if (selectedHotel !== null) {
          const hotelRooms = (await getHotelRoomsByItsId(
            selectedHotel,
            "2024-1-1",
            "2024-1-30"
          )) as Room[];
          setRooms(hotelRooms);
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
            notifyError(errorMessages.roomToDeleteNotFound);
            break;
        }
      }
    };
    fetchRooms();
  }, [selectedHotel]);
  
  const handleDeleteRoomClick = async (id: any) => {
    setIsDeleteModalOpen(true);
    setRoomToDelete(id);
  };
  const handleConfirmDelete = async () => {
    if (roomToDelete !== null && typeof selectedHotel === "number") {
      try {
        await deleteRoom(selectedHotel, roomToDelete);
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
      setRoomData({ ...roomInfo, id: roomId });
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
          notifyError(errorMessages.roomsNotFound);
          break;
      }
    }
    setUpdateFormOpen(false);
    setRoomData(null);
  };

  console.log(rooms);
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 10, pt: 7, pr: 3 }}>
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>Loading...</span>
        </div>
      )}
      {!isLoading && (
        <div>
          <div className={style.pageHeaderRooms}>
            <Select
              value={selectedHotel}
              onChange={(e) => {
                const newSelectedHotel =
                  e.target.value === ""
                    ? null
                    : parseInt(e.target.value as string, 10);
                setSelectedHotel(newSelectedHotel);
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 200,
                  },
                },
              }}
              className={style.selectContainer}
            >
              <MenuItem disabled value="">
                <em>Hotels</em>
              </MenuItem>
              {hotelsInfo.map((hotel) => (
                <MenuItem key={hotel.id} value={hotel.id}>
                  {hotel.name}
                </MenuItem>
              ))}
            </Select>

            <div>
              <SmallButton
                value={localization.createRoom}
                buttonWidth={140}
                onClick={handleCreateRoomClick}
              />
            </div>
            <TableWithPagination
              data={rooms}
              itemsPerPage={5}
              onDelete={({ id: roomId }) => handleDeleteRoomClick(roomId)}
              onEdit={handleEditRoomClick}
            />
            <DeleteConfirmationModal
              isOpen={isDeleteModalOpen}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          </div>

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
        </div>
      )}
    </Box>
  );
}
