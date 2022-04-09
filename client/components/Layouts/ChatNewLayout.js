import { Box, Grid } from "@mui/material";
import AppLayout from "./AppLayout";
import ChatMain from "../Quest/Chat/Chat-New/new-chat-main";
import ChatSidebar from "../Quest/Chat/Chat-Main/chat-sidebar";
import SendMessage from "../Quest/Chat/Chat-Main/send-message";
import { useEffect } from "react";

export default function QuestLayout({ children }) {
  return (
    <AppLayout>
      <Grid container sx={{ paddingTop: "1rem" }} spacing={1}>
        <Grid item xs={12} lg={5}>
          <ChatSidebar />
          <Box sx={{ marginTop: "2rem", bgcolor: "#000000" }}>{children}</Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <ChatMain />

          <Box sx={{ marginTop: "2rem", bgcolor: "#000000" }}>{children}</Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
