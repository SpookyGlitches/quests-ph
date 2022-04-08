import React from "react";
import { Box } from "@mui/material";
import ChatHeader from "./new-header";

import ChatContent from "./new-chat-content";

const ChatMain = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <ChatHeader />
      <ChatContent />
    </Box>
  );
};

export default ChatMain;
