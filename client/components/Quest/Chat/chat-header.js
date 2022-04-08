import React from "react";
import { Avatar, Grid, Paper, Typography, IconButton } from "@mui/material";

import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import Link from "next/link";

const ChatHeader = () => {
  return (
    <div>
      <Paper
        spacing={2}
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "row",

          marginBottom: "10px",
        }}
      >
        <Grid xs={11} x={{ justifyContent: "center" }}>
          <Typography variant="h6" sx={{ color: "#755cde" }}>
            Lorem Ipsum Team
          </Typography>

          <Grid sx={{ display: "flex", flexDirection: "row", marginTop: 1 }}>
            <Avatar sx={{ width: 21, height: 21 }} />
            <Avatar sx={{ width: 21, height: 21 }} />
            <Avatar sx={{ width: 21, height: 21 }} />
          </Grid>
        </Grid>
        <Grid xs={1} sx={{ marginLeft: "280px" }}>
          <Link href={"/friends"} passHref>
            <IconButton aria-label="delete" size="small">
              <VideocamRoundedIcon
                sx={{ color: "#755cde", fontSize: "35px" }}
              />
            </IconButton>
          </Link>
        </Grid>
      </Paper>
    </div>
  );
};

export default ChatHeader;
