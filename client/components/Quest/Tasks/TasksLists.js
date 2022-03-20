import {
  Box,
  Typography,
  IconButton,
  LinearProgress,
  Grid,
  Button,
} from "@mui/material";

import Link from "next/link";

import AddRoundedIcon from "@mui/icons-material/AddRounded";

import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { format } from "date-fns";

import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import axios from "axios";
import StyledPaper from "../../Common/StyledPaper";

const TasksLists = () => {
  const router = useRouter();

  const { data, error } = useSWR(`/api/quests/${router.query.id}/tasks`);

  if (error) return <div>failed to load</div>;
  if (!data) return <LinearProgress />;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          p: 1,
          m: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
        spacing={3}
      >
        {/* show this button when current user is mentor */}
        <Link href="/quests/1/tasks/create" passHref>
          <Button
            sx={{ maxHeight: "45px" }}
            variant="contained"
            startIcon={<AddRoundedIcon />}
          >
            {" "}
            New Task{" "}
          </Button>
        </Link>
      </Box>
      <Box
        sx={{
          p: 1,
          m: 1,
        }}
      >
        <Typography variant="h5" sx={{ color: "#755cde", marginBottom: 2 }}>
          Today
        </Typography>

        {data.map((task) => (
          <StyledPaper
            key={task.id}
            sx={{ width: "100%", height: "auto", overflow: "hidden", mb: 2 }}
          >
            <Grid container sx={{ minHeight: "1rem" }}>
              <Grid item xs={12} md={2}>
                {/** only render this if mentor is using */}
                <Link
                  href={`/quests/${router.query.id}/tasks/${task.id}`}
                  passHref
                >
                  <Box
                    sx={{
                      backgroundColor: "primary.main",
                      height: "100%",
                      minHeight: "2rem",
                    }}
                  />
                </Link>
                {/* render another box for the user  */}
              </Grid>
              <Grid item xs={12} md={10}>
                <Box
                  sx={{
                    paddingX: "0.8rem",
                    paddingY: "0.8rem",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6">{task.title}</Typography>

                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography variant="body2">
                      {task.points}
                      {" points"}
                    </Typography>

                    <Typography variant="body2">
                      {" "}
                      {format(new Date(task.dueAt), "MMMM dd")}
                    </Typography>

                    <IconButton
                      onClick={async () => {
                        if (window.confirm("Delete item?")) {
                          const deleteUrl = `/api/quests/${router.query.id}/tasks/${task.id}`;
                          const url = `http://localhost:3000/quests/${router.query.id}/tasks`;
                          mutate(
                            url,
                            data.filter((c) => c.id !== task.id),
                            false,
                          ),
                            await axios.delete(deleteUrl);
                          // put trigger here
                        }
                      }}
                      size="small"
                    >
                      <DeleteRoundedIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </StyledPaper>
        ))}
      </Box>
    </Box>
  );
};

export default TasksLists;
