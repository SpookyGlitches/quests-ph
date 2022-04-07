import { Box, Grid, Button, Typography } from "@mui/material";
import axios from "axios";
import AppLayout from "./AppLayout";
import ChatMain from "../Quest/Chat/Chat-Main/chat-main";
import ChatSidebar from "../Quest/Chat/Chat-Main/chat-sidebar";
import SendMessage from "../Quest/Chat/Chat-Main/send-message";

export default function QuestLayout({ children }) {
  const data = 1;
  const createChat = async () => {
    await axios.post(`/api/chat`);
  };
  return (
    <AppLayout>
      <Grid container sx={{ paddingTop: "1rem" }} spacing={1}>
        <Grid item xs={12} lg={5}>
          <ChatSidebar />
          <Box sx={{ marginTop: "2rem", bgcolor: "#000000" }}>{children}</Box>
        </Grid>
        <Grid item xs={12} lg={7}>
          <ChatMain />
          <SendMessage />
          <Button
            sx={{
              backgroundColor: "background.paper",
              borderRadius: (theme) => theme.shape.borderRadius,
            }}
            onClick={createChat}
          >
            <Typography sx={{ variant: "body1", fontWeight: 600, p: 0.75 }}>
              Make a convo
            </Typography>
          </Button>
          <Box sx={{ marginTop: "2rem", bgcolor: "#000000" }}>{children}</Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
