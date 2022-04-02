import {
  Dialog,
  DialogTitle,
  Typography,
  IconButton,
  Button,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import { mutate } from "swr";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import TaskDetails from "./TaskDetails";

export default function FinishTask({
  points,
  description,
  title,
  questTaskid,
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { questId } = router.query;

  const handleOk = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/quests/${questId}/tasks`, {
        points,
        questTaskid,
      });
      setOpen(false);
      mutate(`/quests/${questId}/tasks`);
    } catch (err) {
      console.error(err);
    }
  };
  const handleCancelClick = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    setOpen(true);
  };

  return (
    <>
      <IconButton onClick={handleButtonClick}>
        <MoreHorizRoundedIcon />
      </IconButton>

      <TaskDetails
        points={points}
        description={description}
        title={title}
        questTaskid={questTaskid}
        open={open}
        handleOk={handleOk}
        handleCancel={handleCancelClick}
      />
    </>
  );
}
