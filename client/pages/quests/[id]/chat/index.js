import { Box, Grid } from "@mui/material";
import ChatScreen from "../../../../components/Quest/Chat/chat-main";
import QuestLayout from "../../../../components/Layouts/QuestLayout";

const index = () => {
  return (
    <QuestLayout>
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
    </QuestLayout>
  );
};
export default index;
