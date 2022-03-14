import { Avatar, Typography, Box, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useRouter } from "next/router";

const FriendField = ({ fieldType, fullName, username }) => {
  const router = useRouter();
  const handleProfileClick = (name) => () => {
    router.push(`/profile/${name}`); // profile page url here
  };
  let firstIcon;
  let secondIcon;
  if (fieldType === "Incoming Requests") {
    firstIcon = (
      <IconButton>
        <DeleteRoundedIcon />
      </IconButton>
    );
    secondIcon = (
      <IconButton>
        <GroupAddRoundedIcon />
      </IconButton>
    );
  } else if (fieldType === "Outgoing Requests") {
    secondIcon = (
      <IconButton>
        <DeleteRoundedIcon />
      </IconButton>
    );
  } else {
    firstIcon = (
      <IconButton>
        <PersonRemoveIcon />
      </IconButton>
    );
    secondIcon = (
      <IconButton>
        <ChatRoundedIcon />
      </IconButton>
    );
  }
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
        onClick={fieldType === "Friends" ? handleProfileClick(username) : null}
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
            {fullName}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.4rem",
            }}
          >
            {username}
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

export default FriendField;
