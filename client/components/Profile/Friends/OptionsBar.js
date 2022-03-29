import { Box, Button } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
// eslint-disable-next-line
import HelpCenterRounded from "@mui/icons-material/HelpCenterRounded";
export default function Options({ role }) {
  if (role === "member") {
    return (
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 2,
        }}
        style={{
          height: "auto",
          width: "auto",
          display: "flex",
          padding: "1rem",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Button
          variant="outlined"
          style={{
            width: 100,
            display: "flex",
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
          }}
        >
          <PersonRemoveIcon sx={{ mr: 1 }} />
          Unfriend
        </Button>
        <Button
          variant="outlined"
          style={{
            width: 100,
            display: "flex",
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
          }}
        >
          <ErrorRoundedIcon sx={{ mr: 1 }} />
          Report
        </Button>

        <Button
          variant="outlined"
          style={{
            backgroundColor: "#E8E8E8",
            borderColor: "#E8E8E8",
            color: "black",
            float: "right",
          }}
        >
          <CommentRoundedIcon sx={{ mr: 1 }} />
          Chat
        </Button>
      </Box>
    );
  }
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        borderRadius: 2,
      }}
      style={{
        height: "auto",
        width: "auto",
        display: "flex",
        padding: "1rem",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "auto",
      }}
    >
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
          maxWidth: "105px",
          minWidth: "105px",
          marginRight: "1em",
        }}
      >
        <PersonRemoveIcon sx={{ mr: 1 }} />
        Unfriend
      </Button>
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
          marginRight: "20em",
          maxWidth: "100px",
          minWidth: "100px",
        }}
      >
        <ErrorRoundedIcon sx={{ mr: 1 }} />
        Report
      </Button>

      <Button
        variant="outlined"
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
          float: "right",
          maxWidth: "105px",
          minWidth: "105px",
          marginRight: "1em",
        }}
      >
        <HelpCenterRounded sx={{ mr: 1 }} />
        Request
      </Button>
      <Button
        variant="outlined"
        style={{
          backgroundColor: "#E8E8E8",
          borderColor: "#E8E8E8",
          color: "black",
          float: "right",
          maxWidth: "100px",
          minWidth: "100px",
        }}
      >
        <CommentRoundedIcon sx={{ mr: 1 }} />
        Chat
      </Button>
    </Box>
  );
}
