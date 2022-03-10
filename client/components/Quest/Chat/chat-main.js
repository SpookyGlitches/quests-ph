import React from "react";
import ChatHeader from "./chat-header";
import SendMessage from "./send-message";
import { Box } from "@mui/material";

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
