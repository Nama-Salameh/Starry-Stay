import React from "react";
import { Modal, Typography, Button, Box, Divider } from "@mui/material";
import style from "./DeleteConfirmation.module.css";
const DeleteConfirmationModal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <Box className={style.modalContainer}>
        <Typography variant="h5" className={style.title}>
          Delete Confirmation
        </Typography>
        <Typography className={style.confirmationText}>
          Are you sure you want to delete this city?
        </Typography>

        <Box className={style.buttonContainer}>
          <Button
            onClick={onCancel}
            variant="contained"
            className={style.cancelButton}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            className={style.deleteButton}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
