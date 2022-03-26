import { Avatar, Typography, Box, IconButton } from "@mui/material";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
// import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useState } from "react";
import axios from "axios";

const FriendsField = (item) => {
  const { data: session } = useSession();

  const [friendData] = useState(item.item);
  console.log(friendData);

  const handleDeleteFriend = async () => {
    await axios({
      method: "put",
      url: "/api/friends/deleteFriend",
      data: {
        friendshipId: friendData.friendshipId,
      },
    });
  };
  // const router = useRouter();
  // const handleProfileClick = (name) => () => {
  //   router.push(`/profile/${name}`); // profile page url here
  // };
  const userDisplayed =
    friendData.userTwo.fullName === session.user.fullName
      ? friendData.userOne
      : friendData.userTwo;

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
            {userDisplayed.fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.4rem",
            }}
          >
            {userDisplayed.displayName}
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
