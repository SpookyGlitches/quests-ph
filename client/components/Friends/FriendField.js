import { Avatar, Typography, Box } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ChatIcon from "@mui/icons-material/Chat";

const FriendField = (props) => {
  console.log(props.fieldType);
  if (props.fieldType === "Incoming Requests") {
    var firstIcon = (
      <DeleteOutlineIcon
        sx={{
          marginRight: "0.5rem",
        }}
      />
    );
    var secondIcon = (
      <GroupAddIcon
        sx={{
          marginLeft: "0.5rem",
        }}
      />
    );
  } else if (props.fieldType === "Outgoing Requests") {
    secondIcon = (
      <DeleteOutlineIcon
        sx={{
          marginLeft: "0.5rem",
        }}
      />
    );
  } else {
    firstIcon = (
      <PersonRemoveIcon
        sx={{
          marginRight: "0.5rem",
        }}
      />
    );
    secondIcon = (
      <ChatIcon
        sx={{
          marginLeft: "0.5rem",
        }}
      />
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
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "row",
        }}
      >
        <Avatar
          sx={{
            backgroundColor: "primary.main",
            height: "3.75rem",
            width: "3.75rem",
          }}
        ></Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
              marginTop: ".25rem",
            }}
          >
            {props.fullname}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "flex",
              alignItems: "center",
              marginLeft: "1rem",
              marginTop: "-.35rem",
            }}
          >
            {props.username}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginRight: "2rem",
        }}
      >
        {firstIcon}
        {secondIcon}
      </Box>
    </Box>
  );
};

export default FriendField;
