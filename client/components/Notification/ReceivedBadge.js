import React, { useState } from "react";
import useSWR from "swr";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
} from "@mui/material";
import { formatDistance } from "date-fns";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import BadgeModal from "../Common/BadgeModal";

const ReceivedBadge = ({
  metadata,
  onClick,
  message,
  /* eslint-disable */
  view_status,
  createdAt,
}) => {
  const [badgeModalState, setBadgeModalState] = useState({
    open: false,
    notificationMessage: "",
    badgeDetails: {
      title: "",
      description: "",
      image: "",
    },
  });
  const { data: badgeInfo } = useSWR(`/badges/${metadata.badgeId}`);

  if (!badgeInfo) return null;

  const text = {
    fontWeight: "bold",
  };

  const openBageModal = () => {
    setBadgeModalState({
      open: true,
      notificationMessage: message,
      badgeDetails: {
        image: badgeInfo.image,
        description: badgeInfo.description,
        title: `Gained ${badgeInfo.name} badge`,
      },
    });
  };

  return (
    <>
      <ListItemButton
        onClick={onClick}
        sx={{
          "&.MuiListItemButton-root": {
            padding: 0,
            margin: 0,
          },
          bgcolor: "#ffffff",
          borderRadius: 0.5,
        }}
      >
        <Box sx={{ marginRight: 2, position: "absolute", marginLeft: 0.5 }} />
        <ListItem onClick={openBageModal} alignItems="flex-start">
          <ListItemAvatar sx={{ marginRight: "5px" }}>
            <Avatar alt="Remy Sharp" src={`/badges/${badgeInfo.image}`} />
          </ListItemAvatar>

          <ListItemText
            primaryTypographyProps={{ style: text }}
            primary={badgeInfo.name}
            secondary={
              <Typography
                sx={{ display: "inline", marginTop: 1 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {message}
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
              {formatDistance(new Date(createdAt), new Date(), {
                addSuffix: true,
              })}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {view_status === "SEEN" ? (
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
          </Box>
        </ListItem>
      </ListItemButton>

      <Divider />

      <BadgeModal
        badgeModalState={badgeModalState}
        setOpen={() => setBadgeModalState((prev) => ({ ...prev, open: false }))}
      />
    </>
  );
};

export default ReceivedBadge;
