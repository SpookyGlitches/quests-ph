import { Box, Grid } from "@mui/material";
<<<<<<< HEAD:client/pages/quests/[questId]/chat/index.js
import ChatScreen from "../../../../components/Quest/Chat/chat-main";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
=======
import ChatScreen from "../../../../../components/Quest/Chat/chat-main";
import AppLayout from "../../../../../components/Layouts/AppLayout";
import QuestLayout from "../../../../../components/Layouts/QuestLayout";
>>>>>>> 1b52cd68680fb6502baec83c673576ac86229b30:client/pages/quests/[questId]/chat/[conversationId]/index.js

const index = () => {
  return (
    <Grid container columnSpacing={8} rowSpacing={4}>
      <Grid item xs={12} lg={12}>
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 1,
            height: "auto",
          }}
        >
          <ChatScreen />
        </Box>
      </Grid>
    </Grid>
  );
};

export default index;
index.getLayout = function getLayout(page) {
  return (
    <AppLayout>
      <QuestLayout>{page}</QuestLayout>
    </AppLayout>
  );
};
