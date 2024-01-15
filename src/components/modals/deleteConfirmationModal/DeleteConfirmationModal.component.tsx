import React from "react";
import { Modal, Typography, Button, Box } from "@mui/material";
import style from "./DeleteConfirmation.module.css";
import localization from "../../../localizationConfig";
const DeleteConfirmationModal: React.FC<{
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}> = ({ isOpen, onConfirm, onCancel }) => {
  return (
    <Modal open={isOpen} onClose={onCancel}>
      <Box className={style.modalContainer}>
        <Typography variant="h5" className={style.title}>
          {localization.deleteConfirmation}
        </Typography>
        <Typography className={style.confirmationText}>
          {localization.deleteConfirmationQuestion}
        </Typography>

        <Box className={style.buttonContainer}>
          <Button
            onClick={onCancel}
            variant="contained"
            className={style.cancelButton}
          >
            {localization.cancel}
          </Button>
          <Button
            onClick={onConfirm}
            variant="contained"
            color="error"
            className={style.deleteButton}
          >
            {localization.delete}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteConfirmationModal;
