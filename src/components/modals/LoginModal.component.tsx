import React from "react";
import { Modal, Backdrop, Fade, Box } from "@mui/material";
import Login from "../../pages/login/Login.page";

const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
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
        
          <Login />
      </Fade>
    </Modal>
  );
};

export default LoginModal;
