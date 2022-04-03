import { Box, Grid, Stack } from "@mui/material";
import AppLayout from "./AppLayout";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Tasks/ToDo";
import EndQuest from "../Quest/EndQuest";
import DateCard from "../Quest/Tasks/DateCard";
import Suggestions from "../Common/Suggestions";
import ChatMain from "../Quest/Chat/Chat-Main/chat-main";
import ChatSidebar from "../Quest/Chat/Chat-Main/chat-sidebar";

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
