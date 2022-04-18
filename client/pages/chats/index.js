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
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import useSWR from "swr";
import InboxComponent from "../../components/Chat/InboxComponent";
import AppLayout from "../../components/Layouts/AppLayout";

export default function ChatTalkLayout() {
  const [selectedValue, setSelectedValue] = useState("");
  const { data, error } = useSWR("/chat/getFriendsForChat");
  let searchFriendBar;
  let inboxComponent;
  let img;
  if (error) return <p>Failed to load</p>;
  if (!data) return <CircularProgress />;

  if (data.length !== 0) {
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
          {data.map((user) => (
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
    const inbox = selectedValue;
    inboxComponent = <InboxComponent otherUser={inbox} />;
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
