import { Typography, Box } from "@mui/material";

import AppLayout from "../../../../components/Layouts/AppLayout";
import TaskForm from "../../../../components/Quest/Tasks/TaskForm";

const createTask = () => {
  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.paper",
          borderRadius: 1,
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "80%",
            },
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Typography
            variant="h4"
            sx={{
              color: (theme) => theme.palette.primary.main,
            }}
          >
            Create New Task
          </Typography>
          <TaskForm />
        </Box>
      </Box>
    </AppLayout>
  );
};
export default createTask;
