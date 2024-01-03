import React, { useEffect, useState } from "react";
import localization from "../../localizationConfig";
import { getBooking } from "../../services/booking/Booking.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faCalendarDays,
  faDollarSign,
  faClock,
  faFilePdf,
  faFileDownload,
} from "@fortawesome/free-solid-svg-icons";
import style from "./Confirmation.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import {
  handlePrintPdf,
  handleSavePdf,
} from "../../utils/pdfGeneratorUtils/PdfGeneratoeUtils";
import SmallButton from "../../components/common/Buttons/SmallButton.component";
import { useTheme } from "@mui/system";
import { ErrorTypes } from "../../enums/ErrprTypes.enum";
import { notifyError } from "../../utils/toastUtils/Toast.utils";

const errorMessages = {
  network: localization.networkError,
  unknown: localization.serverIssues,
};

export default function Confirmation() {
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

  useEffect(() => {
    const fetchBookingInfo = async () => {
      try {
        const bookingData = await getBooking(1);
        setBookingInfo(bookingData);
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
    };

    fetchBookingInfo();
  }, []);
  console.log("booking info ", bookingInfo);
  const bookingDateTime = new Date(bookingInfo.bookingDateTime);
  const formattedDate = bookingDateTime.toLocaleDateString();
  const formattedTime = bookingDateTime.toLocaleTimeString();

  console.log("Formatted Date:", formattedDate);
  console.log("Formatted Time:", formattedTime);

  return (
    <div className={style.pageContainer} id="confirmationPage">
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
              <h3>{bookingInfo.customerName} Booking successed. </h3>
              <p> We wish you having a nice travelling. </p>
              <p>
                And please remember, you can booking another rooms at any time.
              </p>
            </div>
            <div className={style.confirmationInfo}>
              <TableContainer
                component={Paper}
                className={style.bookedRoomsTable}
              >
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className={style.boldTableCell}>
                        Room Number
                      </TableCell>
                      <TableCell className={style.boldTableCell}>
                        Room Type
                      </TableCell>
                      <TableCell className={style.boldTableCell}>
                        Hotel Name
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow key={bookingInfo.roomNumber}>
                      <TableCell>{bookingInfo.roomNumber}</TableCell>
                      <TableCell>{bookingInfo.roomType}</TableCell>
                      <TableCell>{bookingInfo.hotelName}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <div className={style.paymentInfo}>
                <p>
                  <FontAwesomeIcon icon={faCreditCard} className={style.icon} />
                  <b>Payment : </b> {bookingInfo.paymentMethod}
                </p>
                <p>
                  <FontAwesomeIcon icon={faDollarSign} className={style.icon} />
                  <b>Total Cost : </b> {bookingInfo.totalCost} <b>$</b>
                </p>
                <p>
                  <FontAwesomeIcon
                    icon={faCalendarDays}
                    className={style.icon}
                  />
                  {formattedDate}
                </p>
                <p>
                  <FontAwesomeIcon icon={faClock} className={style.icon} />
                  {formattedTime}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={style.fialedConfirmContainer}>
            <h3>{bookingInfo.customerName} Booking failed. </h3>
            <p> Please try to booking again </p>
            <p>We are sorry for this, and we will be happy for your booking.</p>
          </div>
        )}
      </div>
    </div>
  );
}
