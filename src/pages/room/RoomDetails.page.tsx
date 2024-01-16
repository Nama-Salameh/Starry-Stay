import React, { useState, useEffect } from "react";
import localization from "../../localizationConfig";
import {
  getRoomPhotosByItsId,
  getRoomInfoByItsId,
} from "../../services/rooms/Rooms.service";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import style from "./RoomDetails.module.css";
import { Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import AmenitiesContainer from "../../components/common/amenitiesContainer/AmenitiesContainer.component";
import Carousel from "../../components/common/carousel/Carousel.component";
import GroupsIcon from "@mui/icons-material/Groups";
import SmallButton from "../../components/common/Buttons/SmallButton.component";
import { isLoggedIn, isSessionExpired } from "../../utils/TokenUtils";
import { useCartContext } from "../../contexts/cartContext/CartContext.context";
import LoginModal from "../../components/modals/loginModal/LoginModal.component";
import { createBrowserHistory } from "history";
import handleErrorType from "../../utils/handleErrorUtils/HnadleError.utils";
import IRoom from "../../interfaces/IRoom.interface";

const errorMessages = {
  notFound: localization.roomNotFound,
  timeout: localization.roomDetailsTimedout,
};

type RoomGallery = {
  id: number;
  url: string;
};

const responsive = {
  allScreens: {
    breakpoint: { max: 4000, min: 0 },
    items: 1,
    centerPadding: 50,
    custom: {
      width: 1500,
      height: 600,
    },
  },
};

export default function RoomDetails() {
  const params = useParams();
  const roomIdString = params.roomId;
  const hotelIdString = params.hotelId;
  const roomId: number = roomIdString ? parseInt(roomIdString, 10) : 0;
  const hotelId: number = hotelIdString ? parseInt(hotelIdString, 10) : 0;
  const [roomInfo, setRoomInfo] = useState<IRoom>();
  const [roomPhotos, setRoomPhotos] = useState<RoomGallery[]>();
  const [isLoading, setIsLoading] = useState(true);
  const { handleAddToCart } = useCartContext();
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const history = createBrowserHistory();

  useEffect(() => {
    document.title = localization.roomPageTitle;
  });
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const roomInfo = await getRoomInfoByItsId(roomId);
        setRoomInfo(roomInfo || {});

        const roomPhotos = await getRoomPhotosByItsId(roomId);
        setRoomPhotos(roomPhotos || []);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          notFound: errorMessages.notFound,
          timeout: errorMessages.timeout,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoomData();
  }, []);

  const handleAddToCartButtonClick = (
    roomNumber: number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    console.log(hotelId, roomNumber);
    if (isLoggedIn() && !isSessionExpired()) {
      handleAddToCart(hotelId, roomNumber);
    } else {
      openLoginModal();
    }
  };
  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };
  const handleGoBack = () => {
    history.back();
  };
  return (
    <div className={style.pageContainer}>
      {!isLoading && (
        <Button
          variant="outlined"
          className={style.backButton}
          onClick={handleGoBack}
        >
          &lt; {localization.back}
        </Button>
      )}
      {isLoading && (
        <div className={style.loadingContainer}>
          <CircularProgress color="primary" />
          <span>{localization.loading}</span>
        </div>
      )}
      <div className={style.roomPageContainer}>
        {!isLoading && (
          <div className={style.roomInfoContainer}>
            {roomPhotos && (
              <div className={style.carosuselContainer}>
                <Carousel responsive={responsive}>
                  {roomPhotos?.map((image, index) => (
                    <img
                      key={index}
                      src={image.url}
                      className={style.roomGalleryImage}
                      alt={`Image ${roomInfo?.roomNumber}`}
                    />
                  ))}
                </Carousel>
              </div>
            )}
            <div className={style.roomDetailsContainer}>
              <h3 className={style.roomNumber}>
                {roomInfo?.roomNumber} {localization.room}
              </h3>
              <h4 className={style.roomType}>
                {roomInfo?.roomType} {localization.room}
              </h4>
              <span className={style.capacityContainer}>
                <GroupsIcon className={style.capacityIcon} />
                {roomInfo?.capacityOfAdults} {localization.adults},
                {roomInfo?.capacityOfChildren} {localization.children}.
              </span>
              <AmenitiesContainer amenities={roomInfo?.roomAmenities || []} />

              {roomInfo?.availability && (
                <div className={style.smallButtonContainer}>
                  <SmallButton
                    value={localization.addToCart}
                    onClick={(e) => {
                      handleAddToCartButtonClick(roomInfo?.roomNumber, e);
                    }}
                  ></SmallButton>
                </div>
              )}
            </div>
          </div>
        )}
        {isLoginModalOpen && (
          <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        )}
      </div>
    </div>
  );
}
