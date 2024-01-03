import React, { useState, useEffect } from "react";
import localization from "../../localizationConfig";
import {
  getRoomAmenitiesByItsId,
  getRoomPhotosByItsId,
  getRoomInfoByItsId,
} from "../../services/rooms/Rooms.service";
import { notifyError } from "../../utils/toastUtils/Toast.utils";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";

const errorMessages = {
  network: localization.networkError,
  notFound: localization.roomNotFound,
  unknown: localization.serverIssues,
};

export default function RoomDetails() {
  const [roomInfo, setRoomInfo] = useState();
  const [roomPhotos, setRoomPhotos] = useState();
  const [RoomAmenities, setRoomAmenities] = useState();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomInfo = await getRoomInfoByItsId(1);
        setRoomInfo(roomInfo || {});

        const roomPhotos = await getRoomPhotosByItsId(1);
        setRoomPhotos(roomPhotos || []);

        const roomAmenities = await getRoomAmenitiesByItsId(1);
        setRoomAmenities(roomAmenities || []);
      } catch (errorType) {
        switch (errorType) {
          case ErrorTypes.Network:
            notifyError(errorMessages.network);
            break;
          case ErrorTypes.NotFound:
            notifyError(errorMessages.notFound);
            break;
          case ErrorTypes.Unknown:
            notifyError(errorMessages.unknown);
            break;
        }
      }
    };

    fetchRoomData();
  }, []);

  console.log("rooms info : ", roomInfo);
  console.log("rooms photos : ", roomPhotos);
  console.log("rooms amenities : ", RoomAmenities);

  return <div>{localization.room}</div>;
}
