import * as React from "react";
import {
  List,
  Box,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
} from "@mui/material";

import { format } from "date-fns";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CheckboxListSecondary() {
  const router = useRouter();

  const { data, error } = useSWR(`/quests/${router.query.questId}/tasks`, {
    refreshInterval: 1000,
  });

  if (error) return <div>failed to load</div>;
  if (!data) return <CircularProgress />;

  console.log(data);
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        height: "100%",

        borderRadius: 2,
      }}
    >
      {!data && <CircularProgress />}
      <Typography variant="h6" color="primary" sx={{ m: 1, p: 1 }}>
        To Do
      </Typography>
      {data.map((task) => (
        <List
          key={task.id}
          sx={{
            bgcolor: "background.paper",
          }}
        >
          <ListItem
            button
            alignItems="flex-start"
            sx={{
              display: "flex",
              flexDirection: "column",
              "& .MuiListItem-root": {
                paddingTop: "2px",
                paddingBottom: "2px",
              },
            }}
          >
            <ListItemText
              sx={{ color: "#755cde" }}
              primary={task.title}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {format(new Date(task.dueAt), "MMMM dd")}
                  </Typography>
                  {"  -  "}
                  {task.description}
                </>
              }
            />
          </ListItem>
        </List>
      ))}
      {data.length > 0 && (
        <ListItem button sx={{ color: "#755cde", borderRadius: 1 }}>
          Show More
        </ListItem>
      )}
    </Box>
  );
}
