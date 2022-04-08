import { Box, Grid } from "@mui/material";
import AppLayout from "../../components/Layouts/AppLayout";

import ChatSidebar from "../../components/Quest/Chat/Chat-Main/chat-sidebar";

import { getSession } from "next-auth/react";
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
          <h1>START CHATTING WITH YOUR FRIENDS</h1>
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
