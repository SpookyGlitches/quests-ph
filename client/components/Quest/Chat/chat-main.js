import React from "react";
import ChatHeader from "./chat-header";
import SendMessage from "./send-message";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Grid,
  Typography,
  ListItemText,
  Chip,
  FormControl,
  Button,
  Divider,
  TextField,
  Paper,
} from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
import ChatContent from "./chat-content";

const TasksLists = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ChatHeader />
      <ChatContent />
      <SendMessage />
    </Box>
  );
};

export default TasksLists;
