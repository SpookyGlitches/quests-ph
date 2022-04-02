import React, { useState, useEffect } from "react";
import { Box, IconButton, TextField } from "@mui/material";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import axios from "axios";

const SendMessage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [message, setMessage] = useState("");

  const sendMessageHandler = async (event) => {
    event.preventDefault();
    try {
      const res = await axios({
        method: "POST",
        url: `/api/chat`,
        data: {
          message,
          username: session.user.fullName,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
    setMessage("");
  };

  return (
    <form onSubmit={(e) => sendMessageHandler(e)}>
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
