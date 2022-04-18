import React, { useState } from "react";
import {
  Button,
  Box,
  Tooltip,
  Container,
  Typography,
  Avatar,
  Paper,
  TextField,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Grid,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from "@mui/material";

import AppLayout from "../../components/Layouts/AppLayout";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import useSWR, { mutate } from "swr";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

const index = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [alignment, setAlignment] = React.useState("all");

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const deleteNotification = async (id) => {
    console.log(id);
    try {
      const res = await axios.delete("/api/notifications", {
        notificationId: id,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const updateNotification_read_seen = async (id) => {
    try {
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
  const { data, error } = useSWR("/notifications", {
    refreshInterval: 0,
  });

  // let finalData = { ...notif, ...person };

  if (error) return <p>Error Fetching</p>;
  if (!data) return <p>Loading...</p>;

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
          // border: 1,
          // borderRadius: 2,
          borderColor: "#D1D1D1",
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
              onClick={() => updateNotification_read_seen(notif.notificationId)}
              sx={{
                "&.MuiListItemButton-root": {
                  padding: 0,
                  margin: 0,
                },
                bgcolor: "#ffffff",
              }}
            >
              <Box
                sx={{ marginRight: 2, position: "absolute", marginLeft: 0.5 }}
              >
                {notif.view_status === "SEEN" ? (
                  <IconButton
                    disableRipple
                    sx={{ "&.MuiIconButton-root": { p: 0, m: 0 } }}
                  >
                    <CircleRoundedIcon
                      sx={{ fontSize: "10px", color: "#755cde" }}
                    />
                  </IconButton>
                ) : (
                  []
                )}
              </Box>
              <ListItem alignItems="flex-start">
                <ListItemAvatar sx={{ marginRight: "5px" }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontWeight: "bold" }}
                  primary={notif.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline", marginTop: 1 }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {notif.message}
                      </Typography>
                      <Typography variant="body2">6d</Typography>
                    </React.Fragment>
                  }
                />

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-end",
                    marginTop: 2,
                  }}
                >
                  <IconButton
                    sx={{ color: "#755cde" }}
                    onClick={() => deleteNotification(notif.notificationId)}
                  >
                    <DeleteRoundedIcon fontSize="medium" />
                  </IconButton>
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
