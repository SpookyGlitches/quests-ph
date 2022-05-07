import {
  Box,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  List,
  ListItem,
  Select,
  Chip,
  Divider,
  ListItemText,
  Stack,
  CircularProgress,
} from "@mui/material";

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import useSWR from "swr";

import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

export default function Reminders() {
  const [selectedValue, setSelectedValue] = useState("");

  const { data: quests } = useSWR("/quests?status=ACTIVE");

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
            <InputLabel>Filter Quest</InputLabel>

            <Select
              label="Filter Quest"
              key={selectedValue}
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
            >
              {quests.map((quest) => (
                /* eslint-disable */
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
            {formatDistanceToNow(new Date(task.dueAt)).split(" ")[0] > 3 ? (
              <Link href={`/quests/${task.questId}/tasks`} passHref>
                <ListItem
                  button
                  alignItems="flex-start"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    "& .MuiListItem-root": {
                      paddingTop: "0px",
                      paddingBottom: "0px",
                      marginTop: "0px",
                      marginBottom: "0px",
                    },
                  }}
                  onClick={() => console.log("clicked")}
                >
                  <ListItemText
                    sx={{ color: "red" }}
                    primary={task.title}
                    secondary={
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="red"
                      >
                        {task.points}
                        {" points"}
                      </Typography>
                    }
                  />

                  <Chip label="Late" color="error" size="small" />
                </ListItem>
              </Link>
            ) : (
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
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
            )}
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
