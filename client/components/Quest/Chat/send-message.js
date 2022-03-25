import React, { useState } from "react";

import { Box, IconButton, TextField } from "@mui/material";

import SendRoundedIcon from "@mui/icons-material/SendRounded";

const SendMessage = () => {
  const [message, setMessage] = useState("");

  const sendMessage = (event) => {
    if (event.key === "Enter") {
      setMessage(event.target.value);
    }
  };

  console.log(message);
  return (
    <Box
      sx={{
        marginTop: 2,
        width: "100%",
        display: "flex",

        flexDirection: "row",
        padding: 1,
        bgcolor: "#f7f8fa",
      }}
      spacing={3}
    >
      <TextField
        sx={{
          flexGrow: 1,
          marginLeft: 1.5,
        }}
        placeholder="Send a message"
        variant="standard"
        InputProps={{ disableUnderline: true }}
        onKeyPress={sendMessage}
      />

      <IconButton aria-label="delete" size="small">
        <SendRoundedIcon sx={{ color: "#755cde" }} />
      </IconButton>
    </Box>
  );
};

export default SendMessage;
