import React, { useState } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import axios from "axios";

const SendMessage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [message, setMessage] = useState("");

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        `/api/chats/${router.query.conversationId}`,
        {
          message,
          username: session.user.fullName,
        },
      );
    } catch (err) {
      console.log(err);
    }
    setMessage("");
  };

  console.log(message);

  return (
    <form onSubmit={(e) => sendMessageHandler(e)}>
      <Box
        sx={{
          marginTop: 4,
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
        {message === "" ? (
          <IconButton aria-label="delete" type="submit" disabled size="small">
            <SendRoundedIcon sx={{ color: "#755cde" }} />
          </IconButton>
        ) : (
          <IconButton aria-label="delete" type="submit" size="small">
            <SendRoundedIcon sx={{ color: "#755cde" }} />
          </IconButton>
        )}
      </Box>
    </form>
  );
};

export default SendMessage;
