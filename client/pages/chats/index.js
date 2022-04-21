import { getSession } from "next-auth/react";
import Image from "next/image";
import {
  Box,
  ListItem,
  Select,
  MenuItem,
  ListItemText,
  Typography,
  Grid,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InboxComponent from "../../components/Chat/InboxComponent";
import AppLayout from "../../components/Layouts/AppLayout";

export default function ChatTalkLayout() {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [userCred, setUserCred] = useState([]);
  const [userChat, setUserChat] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  // const { data, error } = useSWR("/chat/getFriendsForChat");

  // const { data: userData, error: userError } = useSWR(
  //   `auth/getUserCredentials`,
  // );

  // if (error || userError) return <p>Failed to load</p>;
  // if (!data || !userData) return <CircularProgress />;

  const userData = async () => {
    // eslint-disable-next-line
    const res = await fetch("/api/auth/getUserCredentials", {
      method: "GET",
    }) // eslint-disable-next-line
      .then((res) => res.json())
      .then((data) => setUserCred(data));
  };

  useEffect(() => {
    userData();
  }, [userCred]);
  /* 
    So for now this is in a condition, 
    I know not allowed pero it does the job for now :((

    This will get from the Friends Page the userId of the friend
    the logged in user wants to chat with. I run it only if 
    router.query.userInfo has a value set, otherwise I leave it.
   */
  // if (router.query.userInfo !== undefined) {
  //   // eslint-disable-next-line
  //   const { data: userToChatWith, error: userChatWithError } = useSWR(
  //     `/auth/${router.query.userInfo}/getOtherUserCredentials`,
  //   );

  //   if (userChatWithError) return <p>Failed to load</p>;
  //   if (!userToChatWith) return <CircularProgress />;
  //   console.log("naa buang");
  // } else {
  //   console.log("wa buang");
  // }

  const getFriendsForChat = async () => {
    // eslint-disable-next-line
    const res = await fetch("/api/chat/getFriendsForChat", {
      method: "GET",
    }) // eslint-disable-next-line
      .then((res) => res.json())
      .then((data) => setFriends(data));
  };
  useEffect(() => {
    getFriendsForChat();
  }, [friends]);

  const userToChatWith = async () => {
    // eslint-disable-next-line
    const res = await fetch(
      `/api/auth/${router.query.userInfo}/getOtherUserCredentials`,
      {
        method: "GET",
      },
    ) // eslint-disable-next-line
      .then((res) => res.json())
      .then((data) => setUserChat(data));
  };

  useEffect(() => {
    if (router.query.userInfo !== undefined) {
      userToChatWith();
    } else {
      console.log("wala");
    }
  }, []);

  let searchFriendBar;
  let inboxComponent;
  let img;

  if (friends.length !== 0) {
    searchFriendBar = (
      <Box>
        <Select
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mx: 15,
            my: 5,
          }}
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          {friends.map((user) => (
            <MenuItem
              style={{
                overflow: "hidden",
                overflowY: "scroll",
              }}
              key={user.userId}
              value={user}
            >
              <ListItem key={user.userId} alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar alt="No">
                    {user.fullName.charAt(0)}
                    {user.fullName.split(" ")[1].charAt(0)}
                  </Avatar>
                </ListItemAvatar>

                <ListItemText
                  primary={
                    <Grid
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        p: 1,
                        m: 1,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "15px",
                          marginRight: 1,
                          fontWeight: "bold",
                        }}
                      >
                        {user.fullName}
                      </Typography>
                    </Grid>
                  }
                />
              </ListItem>
            </MenuItem>
          ))}
        </Select>
      </Box>
    );
    /*
     This one just sets the value of whose chatbox to open when a dropdown value is selected.
     Otherwise it is empty.
     */
    let otherUser = selectedValue;
    /*
      Which is why here, when we find that there is actually a value passed from friends into 
      router.query.userInfo, cd
    */
    if (router.query.userInfo !== undefined && selectedValue.length === 0) {
      // eslint-disable-next-line
      otherUser = userChat;
    }

    const props = {
      otherUser,
      userCred,
    };
    inboxComponent = <InboxComponent {...props} />;
  } else {
    searchFriendBar = (
      <Typography variant="h5" sx={{ mt: 3, color: "#000000" }} align="center">
        Oops! Looks like you gotta add friends first. :(
      </Typography>
    );
    img = (
      <Image
        layout="responsive"
        src="/chat/manage_chats.svg"
        alt="social_friends"
        height="80"
        width="250"
      />
    );
  }

  return (
    <AppLayout>
      <Box sx={{ mb: 5 }} align="center">
        <Typography sx={{ marginTop: 1 }} variant="h3" align="center">
          Chats Page
        </Typography>
        {searchFriendBar}
      </Box>
      {inboxComponent}
      {img}
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
