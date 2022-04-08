import React from "react";
import { Box, Paper, Typography } from "@mui/material";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const ChatHeader = ({ conversationName }) => {
  return (
    <Box>
      <Paper
        spacing={2}
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Typography>{conversationName}</Typography>
        <MoreHorizRoundedIcon />
      </Paper>
    </Box>
  );
};

export default ChatHeader;
