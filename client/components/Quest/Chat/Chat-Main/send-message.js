import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import axios from "axios";

const SendMessage = ({ username }) => {
  const { data: session } = useSession();
  const [message, setMessage] = useState("");

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("/api/pusher/chat-update", {
        message,
        username,
      });
    } catch (err) {
      console.log(err);
    }
    setMessage("");
  };

  return (
    <form onSubmit={(e) => sendMessageHandler(e)}>
      <Box
        sx={{
          marginTop: 0.5,
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {message !== "" && (
          <IconButton aria-label="delete" type="submit" size="small">
            <SendRoundedIcon sx={{ color: "#755cde" }} />
          </IconButton>
        )}
      </Box>
    </form>
  );
};

export default SendMessage;
