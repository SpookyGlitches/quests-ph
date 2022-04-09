import { Box, Grid, Button, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
import AppLayout from "../../components/Layouts/AppLayout";

import ChatSidebar from "../../components/Quest/Chat/Chat-Main/chat-sidebar";
import Image from "next/image";
import Link from "next/link";
import chatSvg from "../../public/images/chat1.svg";

export default function QuestLayout() {
  const data = 1;
  return (
    <AppLayout>
      <Grid container sx={{ paddingTop: "1rem" }} spacing={2}>
        <Grid item xs={12} lg={5}>
          <ChatSidebar />
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          item
          xs={12}
          lg={7}
          border={1}
          borderColor="#eeeee4"
        >
          <Image alt="chat" src={chatSvg} width={240} height={240} />
          <Typography sx={{ marginTop: 1, color: "#a8ada8" }} align="center">
            Send private messages to a friend
          </Typography>

          <Box
            sx={{
              marginTop: 1,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Link href={"chats/new"}>
              <Button
                sx={{ justifyContent: "center" }}
                size="medium"
                variant="contained"
              >
                Send Message
              </Button>
            </Link>
          </Box>
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
