import React from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Notification(props) {
  const { notify, setNotify } = props;
  const handleClose = () => {
    setNotify({ ...notify, isOpen: false });
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={notify.isOpen}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert severity={notify.type}>{notify.message}</Alert>
    </Snackbar>
  );
}
