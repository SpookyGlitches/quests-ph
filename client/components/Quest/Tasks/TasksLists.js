import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Grid,
  Modal,
  Button,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import { format, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/router";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import StyledPaper from "../../Common/StyledPaper";
import TaskModal from "./TaskModal";
import TaskDone from "../../../public/images/tasks-all-done.svg";
import CustomCircularProgress from "../../Common/CustomSpinner";

const TasksLists = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();
  const { data: session } = useSession();

  const { questId } = router.query;

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
      mutate(`/quests/${router.query.questId}/tasks`);
    }
  };

  const { data: count } = useSWR(`/quests/${questId}/tasks/taskCount`);
  const { data: doneCount } = useSWR(
    `/quests/${questId}/tasks/taskFinishCount`,
  );

  const { data } = useSWR(`/quests/${router.query.questId}/tasks`, false);
  // const latestData = [...data, { ...data, ...{ id: data.task.questTaskid } }];
  // mutate(`/quests/${router.query.questId}/tasks`);
  // mutate(`quests/${router.query.questId}/tasks/pointsLog`);

  if (!data && !count && !doneCount) return <CustomCircularProgress />;

  const memberId = data?.member[0].partyMemberId;

  console.log(data);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,

    height: 500,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          p: 1,
          m: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
        spacing={4}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              "&.MuiBox-root": {
                m: 0,
              },
            }}
          >
            <Typography
              variant="subtitle2"
              color="primary"
              sx={{ marginRight: "10px" }}
            >
              Task Completed: {doneCount} | {count}
            </Typography>

            <Tooltip title="Task Point Rules" arrow>
              <InfoRoundedIcon
                onClick={handleOpen}
                sx={{ cursor: "pointer" }}
                color="primary"
              />
            </Tooltip>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          p: 1,
          m: 1,
        }}
      >
        {data?.tasks.length > 0 ? (
          data?.tasks.map((task) => (
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
                          cursor: "pointer",
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
                      {formatDistanceToNow(new Date(task.dueAt)).split(" ")[0] >
                      3 ? (
                        <Typography variant="body2" color="red">
                          <Tooltip title="This task is over the due date. Deduction is applied.">
                            <Chip label="Late" color="error" />
                            {/* {format(new Date(task.dueAt), "MMMM dd")} */}
                          </Tooltip>
                        </Typography>
                      ) : (
                        <Typography variant="body2" color="green">
                          {format(new Date(task.dueAt), "MMMM dd ")}
                        </Typography>
                      )}

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
                          dueAt={task.dueAt}
                          description={task.description}
                          points={task.points}
                          questTaskid={task.questTaskid}
                          memberId={memberId}
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
            <Image alt="tasks_done" src={TaskDone} width={240} height={240} />
            <Typography variant="h6">Well Done</Typography>
            <Typography variant="body2">
              Your to do list is empty. Good job keep hustlin.
            </Typography>
          </Box>
        )}
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Image src={"/images/points.svg"} width={100} height={100} /> */}

          <Typography
            color="primary"
            align="center"
            sx={{ letterSpacing: 2, marginBottom: 2, fontWeight: "bold" }}
          >
            Task Points Rule
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
              "&.MuiBox-root": {
                marginBottom: 3,
              },
            }}
          >
            <Divider />
            <Typography align="center" variant="body2" sx={{ margin: 2 }}>
              Task points system varies from every quest and mentors. Every
              mentee or members of the quest should perform the task with
              outmoust commitment and honesty to achieve the accuracy of the
              progress results and effectiveness of acheiving goals.
            </Typography>
            <Divider />
            <Box sx={{ margin: 2 }}>
              <Typography
                color="primary"
                align="center"
                sx={{ letterSpacing: 2, fontWeight: "bold" }}
              >
                Full Points
              </Typography>
              <Typography variant="body2" sx={{ textAlign: "left" }}>
                Full Points will be given to all members who completed task
                before the due date.
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                margin: 2,
              }}
            >
              <Typography
                color="primary"
                align="center"
                sx={{ letterSpacing: 2, fontWeight: "bold" }}
              >
                Points Deduction
              </Typography>
              <Box sx={{ display: "flex", flexDirecton: "row" }}>
                <Chip
                  label="50%"
                  variant="contained"
                  color="error"
                  size="small"
                  sx={{
                    width: "20%",
                    marginBottom: 1,
                    marginTop: 1,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ marginLeft: "15px", marginTop: 1.2 }}
                >
                  Applies when task is past due 7 days ago.
                </Typography>
              </Box>
              <Box sx={{ display: "flex", flexDirecton: "row" }}>
                <Chip
                  label="20%"
                  variant="contained"
                  color="warning"
                  size="small"
                  sx={{ width: "20%", marginBottom: 1, marginTop: 1 }}
                />
                <Typography
                  variant="body2"
                  sx={{ marginLeft: "15px", marginTop: 1.2 }}
                >
                  Applies when task is past due 3 days ago.
                </Typography>
              </Box>
            </Box>
            <Divider />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: "100%" }}
              onClick={() => setOpen(false)}
            >
              Close
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default TasksLists;
