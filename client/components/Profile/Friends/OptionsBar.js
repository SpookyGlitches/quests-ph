import * as React from "react";
import { useEffect } from "react";
import { Box, Button } from "@mui/material";
import PersonRemoveAlt1RoundedIcon from "@mui/icons-material/PersonRemoveAlt1Rounded";
import PersonAddAlt1RoundedIcon from "@mui/icons-material/PersonAddAlt1Rounded";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
// eslint-disable-next-line
import HelpCenterRounded from "@mui/icons-material/HelpCenterRounded";
import useSWR from "swr";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Router from "next/router";

export default function Options({ userId, role }) {
  const [friendInfo, setFriendInfo] = React.useState("");
  const [open, setOpen] = React.useState(false);
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
    // axios here

    console.log("will add");
  };
  const handleClose = () => {
    setOpen(false);
  };

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
        <Button
          variant="outlined"
          style={{
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
            float: "right",
          }}
        >
          <CommentRoundedIcon sx={{ mr: 1 }} />
          Chat
        </Button>
      </Box>
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
