import { Box, Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import TaskLists from "../../../../components/Quest/Tasks/TasksLists";
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
            padding: "0.5rem",
            border: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <TaskLists />
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

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
