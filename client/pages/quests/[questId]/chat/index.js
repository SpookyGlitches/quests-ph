import { Box, Grid } from "@mui/material";
import ChatScreen from "../../../../components/Quest/Chat/chat-main";
import QuestLayout from "../../../../components/Layouts/QuestLayout";
import AppLayout from "../../../../components/Layouts/AppLayout";

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
