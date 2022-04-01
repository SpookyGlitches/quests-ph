import * as React from "react";
import { useEffect } from "react";
import useSWR from "swr";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FriendOptionsBar from "./FriendOptionsBar";
import NotFriendOptionsBar from "./NotFriendOptionsBar";

export default function Options({ userId, role }) {
  const [friendInfo, setFriendInfo] = React.useState("");
  // eslint-disable-next-line
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
  if (friendships.length === 0) {
    return (
      <NotFriendOptionsBar
        userId={userId}
        friendInfo={friendInfo}
        action={action}
        role={role}
      />
    );
  }
  return (
    <FriendOptionsBar
      userId={userId}
      friendshipId={friendships[0].friendshipId}
      friendInfo={friendInfo}
      action={action}
      role={role}
    />
  );
}
