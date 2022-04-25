import {
  Paper,
  Box,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { useSWRConfig } from "swr";
import { PartyMemberContext } from "../../context/PartyMemberContext";
import { QuestContext } from "../../context/QuestContext";

function EditMentorMessageModal({ open, setOpen }) {
  const { mentorMessage, questId } = useContext(QuestContext);
  const { mutate } = useSWRConfig();
  const [msg, setMsg] = useState(mentorMessage);
  const [error, setError] = useState(false);

  const handleFieldChange = (event) => {
    setMsg(event.target.value);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const saveMessage = async () => {
    if (msg.length > 100) {
      setError(true);
      return;
    }
    setError(false);
    try {
      mutate(
        `/quests/${questId}`,
        (quest) => {
          return { ...quest, mentorMessage: msg };
        },
        { revalidate: false },
      );
      await axios.put(`/api/quests/${questId}/message`, {
        mentorMessage: msg,
      });
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <Dialog open={open} maxWidth="sm" fullWidth>
      <DialogTitle color="primary">Edit Message</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="outlined"
          id="filled-basic"
          label=""
          placeholder="Input anything you want to say as a mentor of this Quest."
          onChange={handleFieldChange}
          minRows={3}
          maxRows={5}
          value={msg}
          multiline
          error={error}
        />
        <Typography variant="caption" sx={{ color: "grey.800" }}>
          {error && "Message reached the maximum amount of 100 characters."}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>Close</Button>
        <Button onClick={saveMessage}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function MentorMessage() {
  const { mentorMessage } = useContext(QuestContext);
  const { role } = useContext(PartyMemberContext);
  const [open, setOpen] = useState(false);
  if (role !== "MENTOR" && !mentorMessage) {
    return null;
  }
  return (
    <Paper sx={{ p: 2 }}>
      {mentorMessage && (
        <Typography
          variant="body1"
          sx={{ fontWeight: "medium" }}
          color="primary"
        >
          Mentor Message
        </Typography>
      )}
      <Typography variant="body2" sx={{ wordBreak: "break-all" }}>
        {mentorMessage}
      </Typography>
      {role === "MENTOR" && !mentorMessage && (
        <Typography variant="body2">
          Got anything to say as a mentor? Edit this message.
        </Typography>
      )}
      {role === "MENTOR" && (
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          <Button variant="text" size="small" onClick={() => setOpen(true)}>
            Edit
          </Button>
        </Box>
      )}
      <EditMentorMessageModal open={open} setOpen={setOpen} />
    </Paper>
  );
}
