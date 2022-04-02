import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  ListItemText,
  Chip,
  CircularProgress,
  Grid,
  Divider,
} from "@mui/material";
import Pusher from "pusher-js";
import useSWR, { mutate } from "swr";
import { format, formatDistance, formatRelative, subDays } from "date-fns";
import ReactScrollableFeed from "react-scrollable-feed";
import { useSession } from "next-auth/react";

const ChatContent = () => {
  const { data: session, status } = useSession();
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [onlineUsersCount, setOnlineUsersCount] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState([]);

  Pusher.logToConsole = true;

  var pusher = new Pusher(process.env.NEXT_PUBLIC_key, {
    cluster: "ap1",
    authEndpoint: "api/pusher/auth",
  });

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const channel = pusher.subscribe("presence-channel");

      //when users subscribe to a channel / count all members

      // channel.bind("pusher:subscription_succeeded", (members) => {
      //   setOnlineUsersCount(member.count);
      // });

      // // when a new member joins the chat
      // channel.bind("pusher:member_added", (member) => {
      //   setOnlineUsersCount(channel.members.count);

      //   setOnlineUsersCount((prevState) => [
      //     ...prevState,
      //     { username: member.info.username },
      //   ]);
      // });
      channel.bind("chat-update", (data) => {
        const { message, username } = data;

        setChats((prevState) => [...prevState, { username, message }]);
      });
    }
    return () => {
      pusher.unsubscribe("presence-channel");
      mounted = false;
    };
  }, []);

  const { data, error } = useSWR("/chat");

  if (error) return <div>failed to load</div>;

  return (
    <Box
      display="column"
      height="400px"
      style={{
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <Divider>
        <Chip label="Unread Messages" />
      </Divider>
      <ReactScrollableFeed>
        <List
          sx={{
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp">R</Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                    ada
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#d4d9d4", fontSize: "14px" }}
                  >
                    {/* {formatRelative(
                      subDays(new Date(), 0),
                      new Date(chat.createdAt),
                    )} */}
                    asdasd
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
                  dasda
                </Typography>
              }
            />
          </ListItem>
        </List>
      </ReactScrollableFeed>
    </Box>
  );
};

export default ChatContent;
