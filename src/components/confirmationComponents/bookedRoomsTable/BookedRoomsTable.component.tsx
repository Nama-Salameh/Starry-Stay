import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import style from "./BookedRoomsTable.module.css";
import localization from "../../../localizationConfig";

export default function BookedRoomsTable({
  bookingInfo,
}: {
  bookingInfo: {
    roomNumber: string;
    roomType: string;
    hotelName: string;
  };
}) {
  return (
    <TableContainer component={Paper} className={style.bookedRoomsTable}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={style.boldTableCell}>
              {localization.roomNumber}
            </TableCell>
            <TableCell className={style.boldTableCell}>
              {localization.roomType}
            </TableCell>
            <TableCell className={style.boldTableCell}>
              {localization.hotelName}
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
  );
}
