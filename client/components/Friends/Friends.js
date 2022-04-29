import { Typography, Box, IconButton, Button } from "@mui/material";
import { useSWRConfig } from "swr";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import CustomAvatar from "../Common/CustomAvatar";

const FriendsField = (item) => {
  const { mutate } = useSWRConfig();
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line
  const [friendData] = useState(item.item);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteFriend = async () => {
    await axios({
      method: "put",
      url: "/api/friends/deleteFriend",
      data: {
        friendshipId: friendData.friendshipId,
      },
    }).then(() => {
      mutate(`/api/friends/friends`);
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
      .get("/api/friends/friendinformation", {
        params: {
          displayName: userDisplayed.displayName,
        },
      })
      .then((res) => {
        router.push(`/profile/${res.data.userId}`); // profile page url here
      });
  };

  const handleChatButtonClick = async () => {
    router.push(
      {
        pathname: `/chats`,
        query: { userInfo: userDisplayed.userId },
      },
      "/chats",
    );
  };

  const firstIcon = (
    <IconButton onClick={handleClickOpen}>
      <PersonRemoveRoundedIcon />
    </IconButton>
  );
  const secondIcon = (
    <IconButton onClick={handleChatButtonClick}>
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
        cursor: "pointer",
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
        <CustomAvatar
          displayName={userDisplayed.displayName}
          image={userDisplayed.image}
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>Delete Friend</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Are you sure you want to delete {userDisplayed.displayName} as a
              friend?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDeleteFriend}>Okay</Button>
          </DialogActions>
        </Dialog>
        {secondIcon}
      </Box>
    </Box>
  );
};

export default FriendsField;
