import AppLayout from "./AppLayout";
import { Box, Grid, Stack } from "@mui/material";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Task/ToDo";
import EndQuest from "../Quest/EndQuest";

export default function QuestLayout({ children }) {
  return (
    <AppLayout>
      <Grid
        container
        sx={{ paddingTop: "1.2rem", marginBottom: "2rem" }}
        columnSpacing={8}
        rowSpacing={4}
      >
        <Grid item xs={12} lg={8}>
          <QuestHeader />
          <Box sx={{ marginTop: "2rem" }}>{children}</Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              height: "auto",
            }}
          >
            <Stack spacing={5}>
              <Todo />
              <EndQuest />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
