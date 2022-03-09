import TaskLists from "../../../../components/Quest/Tasks/TasksLists";
import { Box, Grid } from "@mui/material";
import QuestLayout from "../../../../components/Layouts/QuestLayout";

const index = () => {
  return (
    <QuestLayout>
      <Grid
        container
        sx={{ paddingTop: "1.2rem" }}
        columnSpacing={8}
        rowSpacing={4}
      >
        <Grid item xs={12} lg={12}>
          <Box
            sx={{
              backgroundColor: "background.paper",
              borderRadius: 2,
              height: "auto",
              padding: "0.5rem",
            }}
          >
            <TaskLists />
          </Box>
        </Grid>
      </Grid>
    </QuestLayout>
  );
};
export default index;
