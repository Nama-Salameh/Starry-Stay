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
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import style from "./TableWithPagination.module.css";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Row {
  id: number;
  [key: string]: any;
}
const TableWithNavigation: React.FC<{
  data?: Row[];
  itemsPerPage: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}> = ({ data = [], itemsPerPage, onDelete, onEdit }) => {
  const [page, setPage] = useState(0);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  if (!data.length) {
    return <div>No Hotels Added yet</div>;
  }

  const columns = Object.keys(data[0] || {});
  const filteredColumns = columns.filter((column) => column !== "id");
  const startIdx = page * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;

  const insertSpaceBeforeCapital = (str: string) => {
    return str
      .replace(/([A-Z])/g, " $1")
      .trim()
      .toLowerCase();
  };

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
                    {row[column]}
                  </TableCell>
                ))}
                <TableCell
                  className={`${style.tableBodyCell} ${style.actionsBodyCell}`}
                >
                  <IconButton aria-label="edit" onClick={() => onEdit(row.id)}>
                    <FontAwesomeIcon icon={faEdit} className={style.editIcon} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => onDelete(row.id)}
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

export default TableWithNavigation;
