import { Typography, Box } from "@mui/material";
import FriendField from "./FriendField";

const ListHolder = ({ requestName }) => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        padding: "1rem",
        margin: "2rem",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
      }}
    >
      <Typography color="primary" variant="h3">
        {requestName}
      </Typography>

      <FriendField
        fieldType={requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
    </Box>
  );
};

export default ListHolder;
