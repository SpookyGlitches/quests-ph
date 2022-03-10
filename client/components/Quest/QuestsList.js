import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  DialogActions,
} from "@mui/material";
import QuestItem from "./QuestItem";
import { useState } from "react";

// remove ra ning hasJoined inig nanay backend
const DialogItem = ({ handleOk, handleCancel, open }) => {
  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>Join Quest</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to join this Quest?
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

export default function QuestsList({ hasJoined }) {
  const [open, setOpen] = useState(false);

  const onJoinClick = () => {
    setOpen(true);
  };
  const cancelJoin = () => {
    setOpen(false);
  };
  const joinQuest = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
      }}
    >
      {[...Array(4)].map((item, index) => (
        <QuestItem
          key={item + index}
          hasJoined={hasJoined}
          onJoinClick={onJoinClick}
        />
      ))}
      <DialogItem open={open} handleOk={joinQuest} handleCancel={cancelJoin} />
    </Box>
  );
}
