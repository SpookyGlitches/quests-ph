import React from "react";
import { Avatar, Grid, Paper, Typography } from "@mui/material";
import VideocamIcon from "@mui/icons-material/Videocam";
const ChatHeader = () => {
  return (
    <div>
      <Paper
        spacing={2}
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "row",
          bgcolor: "#755cde",
          marginBottom: "10px",
        }}
      >
        <Grid xs={11} x={{ justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "white" }}>
            Lorem Ipsum Team
          </Typography>
          <Grid sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
            <Avatar sx={{ width: 21, height: 21 }} />
            <Avatar sx={{ width: 21, height: 21 }} />
            <Avatar sx={{ width: 21, height: 21 }} />
          </Grid>
        </Grid>
        <Grid xs={1} sx={{ marginLeft: "220px" }}>
          <VideocamIcon sx={{ color: "white", fontSize: "35px" }} />
        </Grid>
      </Paper>
    </div>
  );
};

export default ChatHeader;
