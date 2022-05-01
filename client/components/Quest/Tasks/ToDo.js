import * as React from "react";
import { List, Box, ListItem, ListItemText, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

import Link from "next/link";
import { format } from "date-fns";
import { useRouter } from "next/router";
import useSWR from "swr";
import CustomSpinner from "../../Common/CustomSpinner";

export default function CheckboxListSecondary() {
  const router = useRouter();

  const { data } = useSWR(`/quests/${router.query.questId}/tasks`);

  if (!data) return <CustomSpinner />;
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        height: "100%",
        borderRadius: 1,
        border: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Box
        sx={{
          backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.8),
          borderRadius: 0.3,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body2"
          color="white"
          sx={{ p: 2, fontWeight: "bold" }}
        >
          To Do Lists
        </Typography>
      </Box>
      {data.tasks.length !== 0 ? (
        data.tasks.map((task) => (
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
                  paddingTop: "0.5px",
                  paddingBottom: "0.5px",
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
        ))
      ) : (
        <Box sx={{ textAlign: "center", margin: 1 }}>
          <Typography>Your to do list is empty!</Typography>
        </Box>
      )}
      {data.tasks.length > 0 && (
        <Link href={`/quests/${router.query.questId}/tasks`} passHref>
          <ListItem button sx={{ color: "#755cde", borderRadius: 1 }}>
            Show More
          </ListItem>
        </Link>
      )}
    </Box>
  );
}
