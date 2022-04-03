import React from "react";
import { Box } from "@mui/material";
import ChatHeader from "../Chat-Main/chat-header";

import ChatContent from "../Chat-Main/chat-content";

const TasksLists = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ChatHeader />
      <ChatContent />
    </Box>
  );
};

export default TasksLists;
