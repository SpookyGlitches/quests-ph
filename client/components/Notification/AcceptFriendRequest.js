import React, { useState } from "react";
import useSWR from "swr";
import {
  Box,
  Typography,
  Avatar,
  Badge,
  IconButton,
  ListItemButton,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { formatDistance } from "date-fns";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CancelPresentationRoundedIcon from "@mui/icons-material/CancelPresentationRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Link from "next/link";
import CustomAvatar from "../Common/CustomAvatar";

const FriendRequest = ({
  metadata,
  onClick,
  onRemove,
  message,
  createdAt,
  /* eslint-disable */
  view_status,
}) => {
  const [anchorWoop, setAnchorWoop] = useState(null);
  const [openWoopPopper, setOpenWoopPopper] = useState(false);
  const { data: userInfo } = useSWR(`/users/${metadata.userId}`);

  if (!userInfo) return null;

  const text = {
    fontWeight: "bold",
  };
  const SmallAvatar = styled(Avatar)(({ theme }) => ({
    width: 22,
    height: 22,
    border: `2px solid ${theme.palette.background.paper}`,
  }));

  const handleWoopPopperClick = (event) => {
    event.preventDefault();
    setAnchorWoop(event.currentTarget);
    setOpenWoopPopper(!openWoopPopper);
  };

  const closeWoopPopper = () => {
    setOpenWoopPopper(false);
  };

  return (
    /* eslint-disable */
    <>
      <ListItemButton
        sx={{
          "&.MuiListItemButton-root": {
            padding: 0,
            margin: 0,
          },
          bgcolor: "#ffffff",
          borderRadius: 1,
        }}
      >
        <Box sx={{ marginRight: 2, position: "absolute", marginLeft: 0.5 }} />
        <ListItem alignItems="flex-start">
          <Link href={`/profile/${userInfo.userId}`} passHref>
            <ListItemAvatar sx={{ marginRight: "5px" }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <SmallAvatar alt="Travis Howard" src="/friends/friend.svg" />
                }
              >
                <CustomAvatar
                  displayName={userInfo.displayName}
                  image={userInfo.image}
                />
              </Badge>
            </ListItemAvatar>
          </Link>
          <ListItemText
            sx={{ marginTop: 2 }}
            primaryTypographyProps={{ style: text }}
            primary={
              <Typography
                sx={{ display: "inline", marginTop: 1 }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {userInfo.fullName} {message}
              </Typography>
            }
            secondary={<></>}
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
                justifyContent: "flex-end",
              }}
            >
              {view_status === "SEEN" ? (
                <IconButton
                  disableRipple
                  sx={{
                    "&.MuiButtonBase-root": { p: 0, m: 0 },
                  }}
                >
                  <CircleRoundedIcon
                    sx={{ fontSize: "10px", color: "#755cde" }}
                  />
                </IconButton>
              ) : (
                []
              )}
              <IconButton
                onClick={handleWoopPopperClick}
                sx={{
                  marginLeft: "10px",
                  "&.MuiIconButton-root": { p: 0, m: 0 },
                }}
              >
                <MoreHorizRoundedIcon />
              </IconButton>
            </Box>
          </Box>
        </ListItem>
      </ListItemButton>
      <Divider />

      <Menu
        dense
        open={openWoopPopper}
        anchorEl={anchorWoop}
        onClose={closeWoopPopper}
        transition
      >
        <MenuItem dense onClick={onClick} color="primary">
          <CheckRoundedIcon sx={{ marginRight: 1 }} />
          Mark as read
        </MenuItem>
        <MenuItem dense onClick={() => onRemove()} color="primary">
          <CancelPresentationRoundedIcon sx={{ marginRight: 1 }} />
          Remove this notification
        </MenuItem>
      </Menu>
    </>
  );
};

export default FriendRequest;
