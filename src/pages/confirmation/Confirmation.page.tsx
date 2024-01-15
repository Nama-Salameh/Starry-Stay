import React, { useEffect, useState } from "react";
import localization from "../../localizationConfig";
import { getBooking } from "../../services/booking/Booking.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf, faFileDownload } from "@fortawesome/free-solid-svg-icons";
import style from "./Confirmation.module.css";
import { Button, IconButton, CircularProgress } from "@mui/material";
import {
  handlePrintPdf,
  handleSavePdf,
} from "../../utils/pdfGeneratorUtils/PdfGeneratoeUtils";
import { useTheme } from "@mui/system";
import { ErrorTypes } from "../../enums/ErrorTypes.enum";
import { createBrowserHistory } from "history";
import { useParams } from "react-router-dom";
import BookedRoomsTable from "../../components/confirmationComponents/bookedRoomsTable/BookedRoomsTable.component";
import PaymentInfoContainer from "../../components/confirmationComponents/paymentInfoContainer/PaymentInfoContainer.component";
import handleErrorType from "../../utils/handleErrorUtils/HnadleError.utils";

const errorMessages = {
  timeout: localization.loadingConfiramtionTimeout,
};

export default function Confirmation() {
  const params = useParams();
  const confirmationNumberString = params.roomId;
  const confirmationNumber: number = confirmationNumberString
    ? parseInt(confirmationNumberString, 10)
    : 0;
  const theme = useTheme();
  const [bookingInfo, setBookingInfo] = useState({
    bookingDateTime: "",
    bookingStatus: "",
    customerName: "",
    hotelName: "",
    paymentMethod: "",
    roomNumber: "",
    roomType: "",
    totalCost: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const history = createBrowserHistory();

  useEffect(() => {
    document.title = localization.confirmationPageTitle;
  });
  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        const bookingData = await getBooking(confirmationNumber);
        setBookingInfo(bookingData);
      } catch (errorType) {
        handleErrorType(errorType as ErrorTypes, {
          timeout: errorMessages.timeout,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingInfo();
  }, []);
  const bookingDateTime = new Date(bookingInfo.bookingDateTime);
  const formattedDate = bookingDateTime.toLocaleDateString();
  const formattedTime = bookingDateTime.toLocaleTimeString();

  const handleGoBack = () => {
    history.back();
  };
  return (
    <div className={style.pageContainer}>
      <Button
        variant="outlined"
        className={style.backButton}
        onClick={handleGoBack}
      >
        &lt; {localization.back}
      </Button>
      <div className={style.ConfirmationPageContainer} id="confirmationPage">
        {isLoading && (
          <div className={style.loadingContainer}>
            <CircularProgress color="primary" />
            <span>{localization.loading}</span>
          </div>
        )}
        {!isLoading && (
          <div className={style.bookingInfoContainer}>
            <div className={style.fileeOptionsContainer}>
              <IconButton
                onClick={() => handlePrintPdf("confirmationPage")}
                sx={{
                  backgroundColor: "var(--mui-palette-primary-main)",
                  fontSize: 20,
                  borderRadius: 5,
                  marginRight: 2,
                }}
                style={{
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.primary.main,
                  fontSize: 20,
                  borderRadius: 5,
                }}
              >
                <FontAwesomeIcon
                  icon={faFilePdf}
                  color="var(--mui-palette-secondary-main)"
                  fontSize="medium"
                />
              </IconButton>
              <IconButton
                onClick={() => handleSavePdf("confirmationPage")}
                style={{
                  color: theme.palette.secondary.main,
                  backgroundColor: theme.palette.primary.main,
                  fontSize: 20,
                  borderRadius: 5,
                }}
              >
                <FontAwesomeIcon
                  icon={faFileDownload}
                  color="var(--mui-palette-secondary-main)"
                  fontSize="medium"
                />
              </IconButton>
            </div>
            {bookingInfo.bookingStatus === "Confirmed" ? (
              <div>
                <div className={style.successConfirmContainer}>
                  <h3>
                    {bookingInfo.customerName} {localization.bookingSuccessd}{" "}
                  </h3>
                  <p> {localization.wishNiceTravelling} </p>
                  <p>{localization.bookingAnotherTime}</p>
                </div>
                <div className={style.confirmationInfo}>
                  <div className={style.bookedRoomsTableContainer}>
                    <BookedRoomsTable
                      bookingInfo={{
                        roomNumber: bookingInfo.roomNumber,
                        roomType: bookingInfo.roomType,
                        hotelName: bookingInfo.hotelName,
                      }}
                    />
                  </div>
                  <div className={style.paymentInfoContainer}>
                    <PaymentInfoContainer
                      paymentInfo={{
                        paymentMethod: bookingInfo.paymentMethod,
                        totalCost: bookingInfo.totalCost,
                        formattedDate: formattedDate,
                        formattedTime: formattedTime,
                      }}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className={style.fialedConfirmContainer}>
                <h3>
                  {bookingInfo.customerName} {localization.bookingFailed}{" "}
                </h3>
                <p> {localization.tryBookingAgain} </p>
                <p>{localization.sorryForBooking}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
