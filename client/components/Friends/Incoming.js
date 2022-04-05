import { Avatar, Typography, Box, IconButton } from "@mui/material";
import { useSWRConfig } from "swr";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

const IncomingField = (item) => {
  const { mutate } = useSWRConfig();
  // eslint-disable-next-line
  const [incomingData] = useState(item.item);

  const router = useRouter();

  const handleProfileClick = () => {
    axios
      .get("/api/profile/friends/friendinfo", {
        params: {
          displayName: incomingData.requester.displayName,
        },
      })
      .then((res) => {
        router.push(`/profile/${res.data.userId}`); // profile page url here
      });
  };

  const handleDeleteFriendRequest = async () => {
    await axios({
      method: "put",
      url: "/api/friends/removeFriendRequest",
      data: {
        friendRequestId: incomingData.friendRequestId,
      },
    }).then(() => {
      mutate(`/api/friends/incoming`);
    });
  };

  const handleAcceptFriendRequest = async () => {
    await axios({
      method: "post",
      url: "/api/friends/confirmFriendRequest",
      data: {
        friendRequestId: incomingData.friendRequestId,
        requesterId: incomingData.requesterId,
        requesteeId: incomingData.requesteeId,
      },
    })
      .then(() => {
        mutate(`/api/friends/incoming`);
      })
      .finally(() => {
        mutate(`/api/friends/friends`);
      });
  };

  const firstIcon = (
    <IconButton onClick={handleDeleteFriendRequest}>
      <DeleteRoundedIcon />
    </IconButton>
  );
  const secondIcon = (
    <IconButton onClick={handleAcceptFriendRequest}>
      <GroupAddRoundedIcon />
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
            {incomingData.requester.fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.4rem",
            }}
          >
            {incomingData.requester.displayName}
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

export default IncomingField;
