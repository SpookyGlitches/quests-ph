import { Typography, Box, IconButton } from "@mui/material";
import { useSWRConfig } from "swr";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import CustomAvatar from "../Common/CustomAvatar";

const OutgoingField = (item) => {
  const { mutate } = useSWRConfig();
  // eslint-disable-next-line
  const [outgoingData] = useState(item.item);

  const router = useRouter();

  const handleProfileClick = async () => {
    axios
      .get("/api/friends/friendinformation", {
        params: {
          displayName: outgoingData.requestee.displayName,
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
        friendRequestId: outgoingData.friendRequestId,
      },
    }).then(() => {
      mutate(`/api/friends/outgoing`);
    });
  };

  const secondIcon = (
    <IconButton onClick={handleDeleteFriendRequest}>
      <DeleteRoundedIcon />
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
        <CustomAvatar
          displayName={outgoingData.requestee.displayName}
          image={outgoingData.requestee.image}
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
            {outgoingData.requestee.displayName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.4rem",
            }}
          >
            {outgoingData.requestee.fullName}
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
        {secondIcon}
      </Box>
    </Box>
  );
};

export default OutgoingField;
