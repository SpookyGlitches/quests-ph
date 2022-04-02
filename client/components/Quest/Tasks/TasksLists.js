import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { format } from "date-fns";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import axios from "axios";
import StyledPaper from "../../Common/StyledPaper";
import TaskModal from "./TaskModal";
import { useSession } from "next-auth/react";

const TasksLists = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession();

  const { questId } = router.query;

  const handleCancelClick = () => {
    setOpen(false);
  };
  const handleButtonClick = () => {
    setOpen(true);
  };

  const createBtn = `/quests/${questId}/tasks/create`;

  const deleteHandler = async (id) => {
    // eslint-disable-next-line
    if (window.confirm("Delete item?")) {
      // eslint-disable-next-line
      if (!router.query.id) {
        console.log("no id found");
      }
      const deleteUrl = `/api/quests/${questId}/tasks/${id}`;

      await axios.delete(deleteUrl);
      // put trigger here
    }
  };

  const { data, error } = useSWR(`/quests/${router.query.questId}/tasks`);

  if (error) return <div>failed to load</div>;
  if (!data) return <CircularProgress />;

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
        <Typography variant="h5" sx={{ color: "#755cde" }}>
          Today
        </Typography>

        {/* show this button when current user is mentor */}
        {session.user.role === "mentor" ? (
          <Link href={createBtn} passHref>
            <Button
              sx={{ alignItems: "flex-end" }}
              variant="contained"
              startIcon={<AddRoundedIcon />}
            >
              New Task
            </Button>
          </Link>
        ) : (
          []
        )}
      </Box>

      <Box
        sx={{
          p: 1,
          m: 1,
        }}
      >
        {data.length > 0 ? (
          data.map((task) => (
            <StyledPaper
              key={task.questTaskid}
              sx={{ width: "100%", height: "auto", overflow: "hidden", mb: 2 }}
            >
              <Grid container sx={{ minHeight: "1rem" }}>
                <Grid item xs={12} md={2}>
                  {/** only render this if mentor is using */}
                  {session.user.role === "mentor" ? (
                    <Link
                      href={`/quests/${router.query.questId}/tasks/${task.questTaskid}`}
                      passHref
                      disabled
                    >
                      <Box
                        sx={{
                          backgroundColor: "primary.main",
                          height: "100%",
                          minHeight: "2rem",
                        }}
                      />
                    </Link>
                  ) : (
                    <Box
                      sx={{
                        backgroundColor: "primary.main",
                        height: "100%",
                        minHeight: "2rem",
                      }}
                    />
                  )}
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
                        {"   "}
                        {format(new Date(task.dueAt), "MMMM dd")}
                      </Typography>

                      {session.user.role === "mentor" ? (
                        <IconButton
                          onClick={() => deleteHandler(task.questTaskid)}
                          size="small"
                        >
                          <DeleteRoundedIcon />
                        </IconButton>
                      ) : (
                        <TaskModal
                          title={task.title}
                          description={task.description}
                          points={task.points}
                          questTaskid={task.questTaskid}
                        />
                      )}
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </StyledPaper>
          ))
        ) : (
          <Box sx={{ textAlign: "center" }}>
            <Typography>Yeyyy</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default TasksLists;
