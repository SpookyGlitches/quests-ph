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
  CircularProgress,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { formatRelative, subDays } from "date-fns";
import ReactScrollableFeed from "react-scrollable-feed";
import useSWR, { mutate } from "swr";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";

const ChatContent = ({ username }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [chats, setChats] = useState([]);
  const [onlineUsersCount, setonlineUsersCount] = useState(0);
  const [onlineUser, setOnlineUsers] = useState([]);

  const pusher = new Pusher(process.env.NEXT_PUBLIC_key, {
    cluster: "ap1",
    encrypted: true,
    authEndpoint: "/api/pusher/auth",
  });

  Pusher.logToConsole = true;

  // const channel = pusher.subscribe("presence-chat", (data) => {
  //   console.log("subscribed");
  // });

  // useEffect(() => {
  //   channel.bind("chat-send", (data) => {
  //     setChats(data);
  //   });

  //   channel.bind("pusher:subscription_succeeded", (data) => {
  //     console.log(data);
  //   });

  //   channel.bind("pusher:subscription_error", (err) => {
  //     console.log(err.error);
  //   });

  //   return () => {
  //     pusher.unsubscribe("presence-chat");
  //   };
  // }, [chats]);

  // console.log(channel);

  useEffect(() => {
    const mounted = true;
    if (mounted) {
      const channel = pusher.subscribe("presence-chat");
      channel.bind("chat-send", (data) => {
        // const { message } = data;
        // setChats((prevState) => [
        //   ...prevState,
        //   { username: session.user.fullName, message: data.message },
        // ]);

        alert(JSON.stringify(data));
      });
    }
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
    ``;
  }, [chats]);

  const { data, error } = useSWR(`/chats/${router.query.conversationId}`, {
    refreshInterval: 0,
  });
  mutate(`/chats/${router.query.conversationId}`);

  if (error) return <p>Failed</p>;
  if (!data) return <CircularProgress />;

  console.log(data);

  return (
    <Box border={1} borderColor="#eeeee4" display="column" height="485px">
      <Divider>
        <Chip label="Unread Messsages" />
      </Divider>
      <ReactScrollableFeed>
        <List
          sx={{
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          {/* {data.chats.map((chat) => ( */}
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp">
                {/* {chat[0].user.fullName.charAt(0)}
                  {chat[1].user.fullName.split(" ")[1].charAt(0)} */}
              </Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                    {/* {chat.user.fullName} */}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#d4d9d4", fontSize: "14px" }}
                  >
                    {/* {chat.createdAt} */}
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
                  {/* {chat.text} */}
                </Typography>
              }
            />
          </ListItem>
          {/* ))} */}
        </List>
      </ReactScrollableFeed>
    </Box>
  );
};

export default ChatContent;
