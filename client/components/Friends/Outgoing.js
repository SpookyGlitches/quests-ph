import { Avatar, Typography, Box, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
// import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

// async function getUser() {
//   try {
//     const { data } = await axios.get("/api/friends");
//     console.log(data);
//   } catch (error) {
//     console.error(error);
//   }
//   return data;
// }

const OutgoingField = (item) => {
  const [outgoingData] = useState(item.item);
  // const router = useRouter();
  // const handleProfileClick = (name) => () => {
  //   router.push(`/profile/${name}`); // profile page url here
  // };
  //   let firstIcon;

  const handleDeleteFriendRequest = async () => {
    await axios({
      method: "put",
      url: "/api/friends/removeFriendRequest",
      data: {
        friendRequestId: outgoingData.friendRequestId,
      },
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
            {outgoingData.requestee.fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.4rem",
            }}
          >
            {outgoingData.requestee.displayName}
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
        {/* {firstIcon} */}
        {secondIcon}
      </Box>
    </Box>
  );
};

export default OutgoingField;
