import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
  Divider,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const TaskDetails = ({
  handleOk,
  handleCancel,
  open,
  points,
  description,
  questTaskid,
  memberId,
  title,
}) => {
  const router = useRouter();

  return (
    <form>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>Task Information</DialogTitle>

        <DialogContent>
          <Typography variant="h5">Title: {title}</Typography>

          <Typography variant="body1">description: {description}</Typography>
          <Typography variant="body1">ID: {questTaskid}</Typography>
          <Typography variant="caption1">Points: {points}</Typography>
          <Typography variant="caption1">Member ID: {memberId}</Typography>
          <input type="hidden" value={questTaskid} />
          <input type="hidden" value={points} />
          <input type="hidden" value={memberId} />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel}>
            Cancel
          </Button>
          <Button tpye="submit" onClick={handleOk}>
            Mark As Done
          </Button>
        </DialogActions>
      </Dialog>
    </form>
  );
};

export default TaskDetails;
