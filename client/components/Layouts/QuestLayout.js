import AppLayout from "./AppLayout";
import { Box, Grid } from "@mui/material";
import QuestHeader from "../Quest/QuestHeader";
import Todo from "../Quest/Task/ToDo";

export default function QuestLayout({ children }) {
  return (
    <AppLayout>
      <Grid
        container
        sx={{ paddingTop: "1.2rem" }}
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
              backgroundColor: "background.paper",
              borderRadius: 2,
              height: "auto",
              padding: "0.5rem",
            }}
          >
            <Todo />
          </Box>
        </Grid>
      </Grid>
    </AppLayout>
  );
}
