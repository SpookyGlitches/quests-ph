import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  List,
  ListItem,
  Select,
  Divider,
  Skeleton,
  ListItemText,
  Checkbox,
  Stack,
  FormGroup,
  FormControlLabel,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { useState, useEffect } from "react";
import useSWR from "swr";

import { formatRelative, subDays } from "date-fns";
import Link from "next/link";

export default function Reminders() {
  const data = 0;
  const [selectedValue, setSelectedValue] = useState("");
  const [tasks, setTasks] = useState([]);

  const { data: quests, error } = useSWR("/quests?status=ACTIVE");

  useEffect(() => {
    if (quests) {
      setSelectedValue(quests.length <= 0 ? -1 : quests[0].questId);
    }
  }, [quests]);

  const { data: getSpecificTasks } = useSWR(
    selectedValue && quests ? `/quests/${selectedValue}/tasks` : null,
  );

  if (!quests)
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );

  console.log(getSpecificTasks);

  return (
    <Box
      sx={{
        paddingX: "1rem",
        paddingY: "1rem",
        backgroundColor: "background.paper",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: 1,
      }}
    >
      <Stack spacing={1}>
        <Box sx={{ maxHeight: "10rem", minWidth: 120 }}>
          <Typography
            color="primary"
            sx={{ fontWeight: "medium", fontSize: "18px", marginBottom: 3 }}
          >
            Activity Reminders
          </Typography>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel id="demo-simple-select-label">Quest</InputLabel>

            <Select
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {quests.map((quest) => (
                <MenuItem value={quest.questId}>{quest.wish}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Stack>

      {getSpecificTasks && getSpecificTasks.tasks.length > 0 ? (
        getSpecificTasks.tasks.map((task) => (
          <List
            key={task.questId}
            sx={{
              bgcolor: "background.primary",
            }}
            disablePadding
          >
            <Link href={`/quests/${task.questId}/tasks`} passHref>
              <ListItem
                button
                alignItems="flex-start"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  "& .MuiListItem-root": {
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  },
                }}
                onClick={() => console.log("clicked")}
              >
                <ListItemText
                  sx={{ color: "#755cde" }}
                  primary={task.title}
                  secondary={
                    <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {task.points}
                        {" points"}
                        {" | "}
                        {formatRelative(
                          subDays(new Date(task.dueAt), 3),
                          new Date(),
                        )}
                      </Typography>
                  }
                />
              </ListItem>
            </Link>
            <Divider />
          </List>
        ))
      ) : (
        <Typography align="center" color="primary" pt={2}>
          You did great! Relax for now
        </Typography>
      )}
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/landing",
      },
    };
  }

  return {
    props: {},
  };
}
