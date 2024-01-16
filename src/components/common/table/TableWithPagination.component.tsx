import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  TablePagination,
  Typography,
  Box,
  Switch,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./TableWithPagination.module.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Row {
  id: number;
  [key: string]: any;
}
const TableWithPagination: React.FC<{
  data?: Row[];
  itemsPerPage: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}> = ({ data = [], itemsPerPage, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const columns = Object.keys(data[0] || {});
  const filteredColumns = columns.filter(
    (column) =>
      column !== "id" && column !== "roomPhotoUrl" && column !== "hotelId"
  );
  const startIdx = page * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const insertSpaceBeforeCapital = (str: string) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase();
  };

  console.log("rooms", data);
  return (
    <div>
      <TableContainer className={style.tableContainer}>
        <Table className={style.table}>
          <TableHead className={style.tableHead}>
            <TableRow>
              {filteredColumns.map((column) => (
                <TableCell
                  key={column}
                  className={`${style.tableHeadCell} ${style.fullWidth}`}
                >
                  {insertSpaceBeforeCapital(column)}
                </TableCell>
              ))}
              <TableCell
                className={`${style.tableHeadCell} ${style.actionsHeadCell}`}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(startIdx, endIdx).map((row, index) => (
              <TableRow key={row.id} className={style.tableBodyRow}>
                {filteredColumns.map((column) => (
                  <TableCell key={column} className={style.tableBodyCell}>
                    {column === "roomAmenities" ? (
                      (row[column] as { name: string; description: string }[])
                        .map((amenity) => amenity.name)
                        .join(", ")
                    ) : column === "availability" ? (
                      <Switch checked={row[column]} disabled={true} />
                    ) : (
                      row[column]
                    )}
                  </TableCell>
                ))}
                <TableCell
                  className={`${style.tableBodyCell} ${style.actionsBodyCell}`}
                >
                  <IconButton
                    aria-label="edit"
                    onClick={() => onEdit(row.id ? row.id : row.roomId)}
                  >
                    <FontAwesomeIcon icon={faEdit} className={style.editIcon} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(row.id ? row.id : row.roomId)}
                  >
                    <DeleteIcon className={style.deleteIcon} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={style.paginationContainer}>
        <TablePagination
          rowsPerPageOptions={[itemsPerPage]}
          component="div"
          count={data.length}
          rowsPerPage={itemsPerPage}
          page={page}
          onPageChange={handleChangePage}
          className={style.pagination}
        />
        <Typography variant="caption" className={style.pagination}>
          Page {page + 1} of {Math.ceil(data.length / itemsPerPage)}
        </Typography>
      </Box>
    </div>
  );
};

export default TableWithPagination;
