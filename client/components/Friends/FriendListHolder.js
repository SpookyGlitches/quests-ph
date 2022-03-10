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
      <Typography color="primary" variant="h4">
        {props.requestName}
      </Typography>

      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        username="prettyboy912"
      />
    </Box>
  );
};

export default ListHolder;
