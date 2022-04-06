import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Grid,
  Box,
  Typography,
  Divider,
  ListItemText,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReactScrollableFeed from "react-scrollable-feed";
import { useRouter } from "next/router";
import Pusher from "pusher-js";
import ChatHeader from "./new-header";

const ChatContent = ({ username }) => {
  const router = useRouter();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_key, {
      cluster: "eu",
    });
    const channel = pusher.subscribe("presence-channel");

    channel.bind("chat-update", function (data) {
      const { username, message } = data;
      setChats((prevState) => [
        ...prevState,
        { username: data.username, message: data.message },
      ]);
    });

    return () => {
      pusher.unsubscribe("presence-channel");
    };
  }, []);

  return (
    <Box
      border={1}
      borderColor="#eeeee4"
      display="column"
      height="435px"
      style={{
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <ChatHeader />
      <List
        sx={{
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        {chats.map((chat, id) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp">R</Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                    {chat.username}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#d4d9d4", fontSize: "14px" }}
                  >
                    {/* {formatRelative(
                          subDays(new Date(), 0),
                          new Date(chat.createdAt),
                        )} */}
                  </Typography>
                </Grid>
              }
              secondary={
                <Typography
                  sx={{ display: "inline", fontSize: "15px" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {chat.message}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ChatContent;
