import { getSession } from "next-auth/react";
import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import useSWR from "swr";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Image from "next/image";
import {
  Box,
  ListItem,
  Select,
  MenuItem,
  ListItemText,
  TextField,
  Typography,
  Grid,
  Autocomplete,
  Avatar,
  ListItemAvatar,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import InboxComponent from "../../components/Chat/InboxComponent";
import AppLayout from "../../components/Layouts/AppLayout";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedValue, theme) {
  return {
    fontWeight:
      selectedValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ChatTalkLayout() {
  const router = useRouter();
  const [friends, setFriends] = useState([]);
  const [userCred, setUserCred] = useState([]);
  const [userChat, setUserChat] = useState([]);
  //   const [selectedValue, setSelectedValue] = useState("");

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
  }, []);

  let friendsList = [];
  friendsList = friends.map((friend) => {
    return {
      fullName: friend.fullName,
      userId: friend.userId,
      role: friend.role,
    };
  });

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
    }
  }, []);

  let searchFriendBar;
  let inboxComponent;
  let img;
  console.log(friendsList);
  if (friends.length !== 0) {
    searchFriendBar = (
      <Autocomplete
        multiple
        id="tags-outlined"
        options={friendsList}
        getOptionLabel={(option) => option.fullName}
        isOptionEqualToValue={(option, value) =>
          option.fullName === value.fullName
        }
        defaultValue={[friendsList[0]]}
        filterSelectedOptions
        renderInput={(params) => (
          <TextField
            {...params}
            label="Chat Friends"
            placeholder="Choose friends to chat with now"
          />
        )}
      />
    );

    // inboxComponent = <InboxComponent {...props} />;
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
          Chats Testing Page
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
