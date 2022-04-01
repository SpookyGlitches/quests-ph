import * as React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import HelpCenterRounded from "@mui/icons-material/HelpCenterRounded";
import useSWR from "swr";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Router from "next/router";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MemberFriendOptionsBar from "./memberFriendOptionsBar";

export default function Options({ userId, role }) {
  const [friendInfo, setFriendInfo] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openSb, setOpenSb] = React.useState(false);

  const { data: friendInfos } = useSWR(
    userId ? `/profile/${userId}/friendInfo` : null,
  );
  // eslint-disable-next-line
  useEffect(() => {
    if (!friendInfos) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      );
    }
    setFriendInfo(friendInfos);
  }, [friendInfos]);

  const { data: friendships } = useSWR(
    userId ? `/profile/${userId}/friends` : null,
  );
  if (!friendships) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  }

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleDelete = async () => {
    // axios here
    setOpen(false);
    await axios({
      method: "put",
      url: "/api/friends/deleteFriend",
      data: {
        friendshipId: friendships[0].friendshipId,
      },
      // eslint-disable-next-line
    }).then((res) => {
      Router.reload();
    });
  };

  const handleAdd = () => {
    axios({
      method: "get",
      url: `/api/profile/${userId}/outgoingFriend`,
      data: {
        userId,
      },
    })
      .then((response) => {
        if (response.data.length !== 1) {
          axios({
            method: "POST",
            url: `/api/profile/${userId}/addFriend`,
            data: {
              userId,
            },
          })
            .then((res) => {
              setMessage("You have successfully sent a friend request!");
              setOpenSb(true);
              console.log(res);
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          setMessage(
            "You've already added this user. Please check your outgoing requests.",
          );
          setOpenSb(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSb(false);
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleCloseSnackbar}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
  if (friendInfo.role === "member" && friendships.length === 0) {
    // member but not friend
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
        style={{
          height: "auto",
          width: "auto",
          display: "flex",
          padding: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Snackbar
          open={openSb}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={message}
          action={action}
        />
        <Button
          variant="outlined"
          style={{
            width: 150,
            display: "flex",
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
          }}
          sx={{ mr: 2 }}
          onClick={handleAdd}
        >
          {" "}
          <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />
          Add Friend
        </Button>
        <Button
          variant="outlined"
          style={{
            width: 100,
            display: "flex",
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
          }}
        >
          <ErrorRoundedIcon sx={{ mr: 1 }} />
          Report
        </Button>
      </Box>
    );
  }
  if (friendInfo.role === "member" && friendships.length !== 0) {
    // member but friend
    return (
      <MemberFriendOptionsBar
        userId={userId}
        friendshipId={friendships[0].friendshipId}
        friendInfo={friendInfo}
        action={action}
      />
    );
  }
  if (friendInfo.role === "mentor" && friendships.length === 0) {
    // mentor but not friend
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
        style={{
          height: "auto",
          width: "auto",
          display: "flex",
          padding: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Snackbar
          open={openSb}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message={message}
          action={action}
        />
        <Button
          variant="outlined"
          style={{
            width: 150,
            display: "flex",
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
          }}
          sx={{ mr: 2 }}
          onClick={handleAdd}
        >
          {" "}
          <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />
          Add Friend
        </Button>
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
            marginRight: "20em",
            maxWidth: "100px",
            minWidth: "100px",
          }}
        >
          <ErrorRoundedIcon sx={{ mr: 1 }} />
          Report
        </Button>
        {role === "member" ? (
          <Button
            variant="outlined"
            style={{
              backgroundColor: "#E8E8E8",
              borderColor: "#E8E8E8",
              color: "black",
              float: "right",
              maxWidth: "105px",
              minWidth: "105px",
              marginRight: "1em",
            }}
          >
            <HelpCenterRounded sx={{ mr: 1 }} />
            Request
          </Button>
        ) : (
          // eslint-disable-next-line
          <></>
        )}

        <Button
          variant="outlined"
          style={{
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
            float: "right",
            maxWidth: "100px",
            minWidth: "100px",
          }}
        >
          <CommentRoundedIcon sx={{ mr: 1 }} />
          Chat
        </Button>
      </Box>
    );
  }
  // mentor but friend
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
      style={{
        height: "auto",
        width: "auto",
        display: "flex",
        padding: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Button
        variant="outlined"
        style={{
          width: 100,
          display: "flex",
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
        }}
        sx={{ mr: 2 }}
        onClick={handleClickOpen}
      >
        {" "}
        <PersonRemoveAlt1RoundedIcon sx={{ mr: 1 }} />
        Unfriend
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete Friend</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure you want to delete {friendInfo.displayName} as a
            friend?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Okay</Button>
        </DialogActions>
      </Dialog>
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
          marginRight: "20em",
          maxWidth: "100px",
          minWidth: "100px",
        }}
      >
        <ErrorRoundedIcon sx={{ mr: 1 }} />
        Report
      </Button>

      {role === "member" ? (
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
            float: "right",
            maxWidth: "105px",
            minWidth: "105px",
            marginRight: "1em",
          }}
        >
          <HelpCenterRounded sx={{ mr: 1 }} />
          Request
        </Button>
      ) : (
        // eslint-disable-next-line
        <></>
      )}
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
          float: "right",
          maxWidth: "100px",
          minWidth: "100px",
        }}
      >
        <CommentRoundedIcon sx={{ mr: 1 }} />
        Chat
      </Button>
    </Box>
  );
}
