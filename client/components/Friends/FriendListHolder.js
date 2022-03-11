import { Typography, Box } from "@mui/material";
import FriendField from "./FriendField";

const ListHolder = ({ requestName, fullName, username }) => {
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
        fullname={fullName}
        username={username}
      />
    </Box>
  );
};

export default ListHolder;
