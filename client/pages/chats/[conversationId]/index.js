import { Box, Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import AppLayout from "../../../components/Layouts/AppLayout";
import ChatMain from "../../../components/Quest/Chat/Chat-New/new-chat-main";
import ChatSidebar from "../../../components/Quest/Chat/Chat-Main/chat-sidebar";
import SendMessage from "../../../components/Quest/Chat/Chat-Main/send-message";
import ChatHeader from "../../../components/Quest/Chat/Chat-Main/chat-header";
import ChatContent from "../../../components/Quest/Chat/Chat-Main/chat-content";

export default function QuestLayout({ children }) {
  const data = 1;
  return (
    <AppLayout>
      <Grid container sx={{ paddingTop: "1rem" }} spacing={1}>
        <Grid item xs={12} lg={5}>
          <ChatSidebar />
          <Box sx={{ marginTop: "2rem", bgcolor: "#000000" }}>{children}</Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <ChatHeader />
          <ChatContent />
          <SendMessage />
          <Box sx={{ marginTop: "2rem", bgcolor: "#000000" }}>{children}</Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
