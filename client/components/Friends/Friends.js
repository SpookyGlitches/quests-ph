import { Avatar, Typography, Box, IconButton } from "@mui/material";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const FriendsField = (item) => {
  // eslint-disable-next-line
  const [friendData] = useState(item.item);
  const handleDeleteFriend = async () => {
    await axios({
      method: "put",
      url: "/api/friends/deleteFriend",
      data: {
        friendshipId: friendData.friendshipId,
      },
    });
  };
  const router = useRouter();

  const userDisplayed =
    // eslint-disable-next-line
    friendData.userTwo.displayName === item.displayName
      ? friendData.userOne
      : friendData.userTwo;
  const handleProfileClick = async () => {
    axios
      .get("/api/profile/friends/friendinfo", {
        params: {
          displayName: userDisplayed.displayName,
        },
      })
      .then((res) => {
        router.push(`/profile/${res.data.userId}`); // profile page url here
      });
  };
  const firstIcon = (
    <IconButton onClick={handleDeleteFriend}>
      <PersonRemoveRoundedIcon />
    </IconButton>
  );
  const secondIcon = (
    <IconButton>
      <ChatRoundedIcon />
    </IconButton>
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: "1.5rem",
        marginLeft: "0.5rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
        onClick={handleProfileClick}
      >
        <Avatar
          sx={{
            backgroundColor: "primary.main",
          }}
        />
        <Box
          sx={{ display: "flex", flexDirection: "column", marginLeft: "1rem" }}
        >
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.25rem",
            }}
          >
            {userDisplayed.displayName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.4rem",
            }}
          >
            {userDisplayed.fullName}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginRight: "1rem",
        }}
      >
        {firstIcon}
        {secondIcon}
      </Box>
    </Box>
  );
};

export default FriendsField;
