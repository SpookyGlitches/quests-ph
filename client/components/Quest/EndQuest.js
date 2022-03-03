import {
  Dialog,
  DialogTitle,
  Typography,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useState } from "react";

const DialogItem = ({ handleOk, handleCancel, open }) => {
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>End Quest</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to end the Quest? This action cannot be undone.
          Procced?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          No
        </Button>
        <Button onClick={handleOk}>Yes</Button>
      </DialogActions>
    </Dialog>
  );
};

export default function EndQuest() {
  const [open, setOpen] = useState(false);

  const handleCancelClick = () => {
    setOpen(false);
  };
  const handleOk = () => {
    setOpen(false);
  };
  const handleButtonClick = () => {
    setOpen(true);
  };
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleButtonClick}>
        End Quest
      </Button>
      <DialogItem
        open={open}
        handleCancel={handleCancelClick}
        handleOk={handleOk}
      />
    </>
  );
}
