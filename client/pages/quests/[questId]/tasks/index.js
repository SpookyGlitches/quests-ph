import { Box, Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import TaskLists from "../../../../components/Quest/Tasks/TasksLists";
import QuestLayout from "../../../../components/Layouts/QuestLayout";

const index = ({ session }) => {
  return (
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
          <TaskLists session={session} />
        </Box>
      </Grid>
    </Grid>
  );
};
export default index;

index.getLayout = function getLayout(page) {
  return <QuestLayout>{page}</QuestLayout>;
};

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
