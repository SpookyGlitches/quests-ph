import React from "react";

import { Box, Button, TextField } from "@mui/material";

import SendIcon from "@mui/icons-material/Send";
const SendMessage = () => {
  return (
    <Box
      sx={{
        marginTop: 2,
        width: "100%",
        display: "flex",
        border: 1,
        flexDirection: "row",
        padding: 1,
        bgcolor: "#f7f7f7",
      }}
      spacing={3}
    >
      <TextField
        sx={{
          flexGrow: 1,
          marginLeft: 1.5,
        }}
        variant="standard"
        InputProps={{ disableUnderline: true }}
      />
      <Button endIcon={<SendIcon sx={{ fontSize: "30px" }} />} />
    </Box>
  );
};

export default SendMessage;
