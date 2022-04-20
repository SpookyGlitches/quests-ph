import React from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper,
  ListItemButton,
  ListItemAvatar,
  Chip,
  ListItemText,
  Divider,
  ListItem,
  List,
  CircularProgress,
} from "@mui/material";

import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import useSWR, { mutate } from "swr";
import { formatDistance } from "date-fns";
import axios from "axios";
<<<<<<< HEAD

=======
>>>>>>> b3531a07ba3c12ffdcdd1335342ce582439b609f
import AppLayout from "../../components/Layouts/AppLayout";

const index = () => {
  // const deleteNotification = async (id) => {
  //   console.log(id);
  //   try {
  //     const res = await axios.delete("/api/notifications", {
  //       notificationId: id,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const updateNotificationReadSeen = async (id) => {
    try {
      /* eslint-disable */
      const res = await axios.put(
        `/api/notifications`,

        { notificationId: id },
      );
      mutate("/notifications");
      mutate("/notifications/notif_count");
    } catch (error) {
      console.log("failed");
    }
  };

  const text = {
    fontWeight: "bold",
  };
  /* eslint-disable */
  const { data, error } = useSWR("/notifications", {
    refreshInterval: 0,
  });

  // let finalData = { ...notif, ...person };

  if (error) return <p>Error Fetching</p>;
  if (!data) return <CircularProgress />;
  console.log(data);

  return (
    <AppLayout>
      <Paper sx={{ p: 3, display: "flex", gap: 5, flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography variant="h4" color="primary">
            Notifications
          </Typography>
        </Box>
      </Paper>

      <Box
        sx={{
          marginTop: 2,

          borderRadius: 1,
          border: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        {data.map((notif) => (
          <List
            key={notif.notificationId}
            sx={{
              "&.MuiList-root": {
                padding: 0,
                margin: 0,
              },
              width: "100%",
              bgcolor: "primary",
              marginBottom: 1,
              marginLeft: 1,
            }}
          >
            <ListItemButton
              onClick={() => updateNotificationReadSeen(notif.notificationId)}
              sx={{
                "&.MuiListItemButton-root": {
                  padding: 0,
                  margin: 0,
                },
                bgcolor: "#ffffff",
                borderRadius: 1,
              }}
            >
              <Box
                sx={{ marginRight: 2, position: "absolute", marginLeft: 0.5 }}
              />
              <ListItem alignItems="flex-start">
                <Chip
                  label={notif.type.split("_")[1]}
                  color="primary"
                  size="small"
                  sx={{ marginTop: 2, fontWeight: "500" }}
                />
                <ListItemAvatar sx={{ marginRight: "5px" }}>
                  <Avatar alt="Remy Sharp" src="/images/reward.png" />
                </ListItemAvatar>

                <ListItemText
                  primaryTypographyProps={{ style: text }}
                  primary={notif.name}
                  secondary={
                    <Typography
                      sx={{ display: "inline", marginTop: 1 }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {notif.message}
                    </Typography>
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography variant="caption" sx={{ marginBottom: 1 }}>
                    {formatDistance(new Date(notif.createdAt), new Date(), {
                      addSuffix: true,
                    })}
                  </Typography>
                  {notif.view_status === "SEEN" ? (
                    <IconButton
                      disableRipple
                      sx={{
                        "&.MuiIconButton-root": { p: 0, m: 0 },
                      }}
                    >
                      <CircleRoundedIcon
                        sx={{ fontSize: "10px", color: "#755cde" }}
                      />
                    </IconButton>
                  ) : (
                    []
                  )}
                </Box>
              </ListItem>
            </ListItemButton>

            <Divider />
          </List>
        ))}
      </Box>
    </AppLayout>
  );
};

export default index;
