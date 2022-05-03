import React from "react";
import { Button } from "@mui/material";
import useSWR from "swr";
import CustomSpinner from "./CustomSpinner";

const SuggestionFriendshipButton = ({ onClick, userId }) => {
  const { data: friendRequests } = useSWR(
    userId ? `/profile/${userId}/checkrequest` : null,
  );

  if (!friendRequests) return <CustomSpinner />;

  console.log(friendRequests);

  return (
    <div>
      {friendRequests[0]?.status === "PENDING" &&
      friendRequests[0]?.completedAt === null ? (
        <Button variant="contained" size="small" disableRipple>
          Pending
        </Button>
      ) : (
        <Button variant="outlined" size="small" onClick={onClick}>
          Add Friend
        </Button>
      )}
    </div>
  );
};
export default SuggestionFriendshipButton;
