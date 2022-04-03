import React from "react";
import {
  Avatar,
  Grid,
  Box,
  Paper,
  Typography,
  IconButton,
} from "@mui/material";

import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const ChatHeader = () => {
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
        <Typography>Converstation Name</Typography>
        <MoreHorizRoundedIcon />
      </Paper>
    </Box>
  );
};

export default ChatHeader;
