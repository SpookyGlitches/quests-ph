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
      <Typography color="primary" variant="h4">
<<<<<<< HEAD
        {props.requestName}
      </Typography>

      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        displayName="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        displayName="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        displayName="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        displayName="prettyboy912"
      />
      <FriendField
        fieldType={props.requestName}
        fullname="Pretty Boy"
        displayName="prettyboy912"
=======
        {requestName}
      </Typography>

      <FriendField
        fieldType={requestName}
        fullName="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullName="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullName="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullName="Pretty Boy"
        username="prettyboy912"
      />
      <FriendField
        fieldType={requestName}
        fullName="Pretty Boy"
        username="prettyboy912"
>>>>>>> main
      />
    </Box>
  );
};

export default ListHolder;
