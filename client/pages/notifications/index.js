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
  Skeleton,
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
import ReceivedBadge from "../../components/Notification/ReceivedBadge";
import FriendRequest from "../../components/Notification/FriendRequest";
import AcceptFriendRequest from "../../components/Notification/AcceptFriendRequest";
import UserBan from "../../components/Notification/UserBan";
import ApprovedArticle from "../../components/Notification/ApprovedArticle";

export default function Index() {
  const updateNotificationReadSeen = async (notifid) => {
    try {
      const res = await axios.put(`/api/notifications`, {
        notificationId: notifid,
      });
      mutate("/notifications");
      mutate("/notifications/notif_count");
    } catch (error) {
      console.log("failed");
    }
  };
  const deleteNotification = async (notifid) => {
    try {
      const res = await axios.put(`/api/notifications/deleteNotif`, {
        notificationId: notifid,
      });
      mutate("/notifications");
      mutate("/notifications/notif_count");
    } catch (error) {
      console.log("failed delete");
    }
  };

  const text = {
    fontWeight: "bold",
  };
  /* eslint-disable */
  const { data, error } = useSWR("/notifications");

  // let finalData = { ...notif, ...person };

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
        <List>
          {data?.map((notif) => {
            const parse = JSON.parse(notif.metadata);
            if (notif.type === "RECEIVED_BADGE") {
              return (
                <ReceivedBadge
                  metadata={parse}
                  onClick={() =>
                    updateNotificationReadSeen(notif.notificationId)
                  }
                  message={notif.message}
                  view_status={notif.view_status}
                  createdAt={notif.createdAt}
                />
              );
            } else if (notif.type === "FRIEND_REQUEST") {
              return (
                <FriendRequest
                  metadata={parse}
                  onClick={(e) =>
                    updateNotificationReadSeen(notif.notificationId)
                  }
                  onRemove={(e) => deleteNotification(notif.notificationId)}
                  message={notif.message}
                  view_status={notif.view_status}
                  createdAt={notif.createdAt}
                />
              );
            } else if (notif.type === "ACCEPT_FRIEND_REQUEST") {
              return (
                <AcceptFriendRequest
                  metadata={parse}
                  onClick={(e) =>
                    updateNotificationReadSeen(notif.notificationId)
                  }
                  onRemove={(e) => deleteNotification(notif.notificationId)}
                  message={notif.message}
                  view_status={notif.view_status}
                  createdAt={notif.createdAt}
                />
              );
            } else if (notif.type === "USER_BAN") {
              return (
                <UserBan
                  metadata={parse}
                  onClick={(e) =>
                    updateNotificationReadSeen(notif.notificationId)
                  }
                  onRemove={(e) => deleteNotification(notif.notificationId)}
                  message={notif.message}
                  view_status={notif.view_status}
                  createdAt={notif.createdAt}
                />
              );
            } else if (notif.type === "APPROVED_ARTICLE") {
              return (
                <ApprovedArticle
                  metadata={parse}
                  onClick={(e) =>
                    updateNotificationReadSeen(notif.notificationId)
                  }
                  onRemove={(e) => deleteNotification(notif.notificationId)}
                  message={notif.message}
                  view_status={notif.view_status}
                  createdAt={notif.createdAt}
                />
              );
            }
            return null;
          })}
        </List>
      </Box>
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
