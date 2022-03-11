import { Avatar, Typography, Box, IconButton } from "@mui/material";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { useRouter } from "next/router";

const FriendField = (props) => {
  const router = useRouter();
  console.log(props.displayName);
  const handleProfileClick = (name) => () => {
    console.log(name);
    router.push("/profile/" + name); //profile page url here
  };

  let firstIcon, secondIcon;
  if (props.fieldType === "Incoming Requests") {
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
  } else if (props.fieldType === "Outgoing Requests") {
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
        onClick={handleProfileClick(props.displayName)}
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
        ></Avatar>
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
            {props.fullname}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: "-.4rem",
            }}
          >
            {props.displayName}
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
