import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Paper,
  ListItemButton,
  ListItemAvatar,
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
import { getSession } from "next-auth/react";
import AppLayout from "../../components/Layouts/AppLayout";
import BadgeModal from "../../components/Common/BadgeModal";
import DocumentTitle from "../../components/Common/DocumentTitle";
import { useRouter } from "next/router";
export default function Index() {
  const router = useRouter();
  const [badgeModalState, setBadgeModalState] = useState({
    open: false,
    notificationMessage: "",
    badgeDetails: {
      title: "",
      description: "",
      image: "",
    },
  });

  const updateNotificationReadSeen = async (notif) => {
    try {
      if (notif.type === "RECEIVED_BADGE") {
        setBadgeModalState({
          open: true,
          notificationMessage: notif.message,
          badgeDetails: {
            image: notif.image,
            description: notif.description,
            title: `Gained ${notif.name} badge`,
          },
        });
      }
      /* eslint-disable */
      const res = await axios.put(`/api/notifications`, { notificationId: id });
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

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <AppLayout>
      <DocumentTitle title={capitalize(router.pathname.split("/")[1])} />
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
              onClick={() => updateNotificationReadSeen(notif)}
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
                <ListItemAvatar sx={{ marginRight: "5px" }}>
                  <Avatar alt="Remy Sharp" src={`/badges/${notif.image}`} />
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

      <BadgeModal
        badgeModalState={badgeModalState}
        setOpen={() => setBadgeModalState((prev) => ({ ...prev, open: false }))}
      />
    </AppLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
