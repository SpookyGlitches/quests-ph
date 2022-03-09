import { Typography, Box } from "@mui/material";
import FriendField from "./FriendField";

const ListHolder = (props) => {
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
        {props.requestName}
      </Typography>

      <FriendField
        fieldType={props.requestName}
        fullname={props.fullname}
        username={props.username}
      />
    </Box>
  );
};

export default ListHolder;
