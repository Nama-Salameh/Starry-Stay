import React, { useEffect, useState } from "react";
import localization from "../../localizationConfig";
import { getBooking } from "../../services/booking/Booking.service";
import style from "./Confirmation.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function Confirmation() {
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
        console.log("booking data : ", bookingData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookingInfo();
  }, []);
  console.log("booking info ", bookingInfo);
  return (
    <div className={style.pageContainer}>
      <div className={style.bookingInfoContainer}>
        <p className={style.confirmDate}>{bookingInfo.bookingDateTime}</p>
        {!(bookingInfo.bookingStatus === "Confirmed") ? (
          <div>
            <div className={style.successConfirmContainer}>
              <h3>{bookingInfo.customerName} Booking successed. </h3>
              <p> We wish you having a nice travelling. </p>
              <p>
                And please remember, you can booking another rooms at any time.
              </p>
            </div>
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
              <p>Payment method :{bookingInfo.paymentMethod}</p>
              <p>Total Cost : {bookingInfo.totalCost}$</p>
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
