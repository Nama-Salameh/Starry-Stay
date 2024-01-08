import React from "react";
import { Modal, Backdrop, Fade, Box } from "@mui/material";
import Login from "../../../pages/login/Login.page";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <Box>
          <Login />
        </Box>
      </Fade>
    </Modal>
  );
};

export default LoginModal;
