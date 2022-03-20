import { Box, Grid, Stack } from "@mui/material";
import AppLayout from "./AppLayout";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Tasks/ToDo";
import EndQuest from "../Quest/EndQuest";
import DateCard from "../Quest/Tasks/DateCard";
import Suggestions from "../Common/Suggestions";

export default function QuestLayout({ children }) {
  return (
    <AppLayout>
      <Grid container sx={{ paddingTop: "1rem" }} spacing={6}>
        <Grid item xs={12} lg={8}>
          <QuestHeader />
          <Box sx={{ marginTop: "2rem" }}>{children}</Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box sx={{}}>
            <Stack spacing={4}>
              <DateCard />
              <Todo />
              <Suggestions />
              <EndQuest />
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
