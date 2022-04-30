import React, { useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Divider,
  ListItem,
  Button,
} from "@mui/material";
import { formatDistance } from "date-fns";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";

const FriendRequest = ({
  metadata,
  onClick,
  message,
  onRemove,
  createdAt,
  view_status,
}) => {
  const [anchorWoop, setAnchorWoop] = useState(null);
  const [openWoopPopper, setOpenWoopPopper] = useState(false);
  const { data: session } = useSession();
  // const { data: userInfo } = useSWR(`/users/${metadata.userId}`);
  const { mutate } = useSWRConfig();
  const { data: checkFriendReq } = useSWR(
    metadata.friendRequestId
      ? `/notifications/checkRequest/${metadata.friendRequestId}`
      : null,
  );

  // return <div>{metadata.friendRequestId}</div>;

  if (!checkFriendReq) return null;

  const handleAcceptFriendRequest = async (friendRequestId) => {
    await axios({
      method: "post",
      url: "/api/friends/confirmFriendRequest",
      data: {
        friendRequestId,
        requesterId: checkFriendReq[0].requesterId,
        requesteeId: session?.user?.userId,
      },
    });

    mutate("/notifications");
  };

  const handleDeleteFriendRequest = async () => {
    await axios({
      method: "put",
      url: "/api/friends/removeFriendRequest",
      data: {
        friendRequestId: checkFriendReq[0].friendRequestId,
      },
    });

    mutate("/notifications");
  };

  const text = {
    fontWeight: "bold",
  };

  const handleWoopPopperClick = (event) => {
    event.preventDefault();
    setAnchorWoop(event.currentTarget);
    setOpenWoopPopper(!openWoopPopper);
  };

  const closeWoopPopper = () => {
    setOpenWoopPopper(false);
  };

  const handleRemove = () => {
    onRemove;
    setOpenWoopPopper(false);
  };

  const statusConditonalRendering = (checkFriendReq) => {
    if (
      checkFriendReq[0].status === "PENDING" &&
      checkFriendReq[0].completedAt === null
    ) {
      return (
        <>
          <Button
            variant="contained"
            size="small"
            sx={{ marginRight: "10px" }}
            onClick={() =>
              handleAcceptFriendRequest(checkFriendReq[0].friendRequestId)
            }
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            size="small"
            onClick={() =>
              handleDeleteFriendRequest(checkFriendReq[0].friendRequestId)
            }
          >
            Decline
          </Button>
        </>
      );
    } if (
      checkFriendReq[0].status === "COMPLETED" &&
      checkFriendReq[0].completedAt !== null
    ) {
      return (
        <Typography variant="caption">Request Accepted</Typography>
      );
    } 
      return (
        <Typography variant="caption">Request Decline</Typography>
      );
    
  };

  return (
    <>
      <ListItemButton
        sx={{
          "&.MuiListItemButton-root": {
            padding: 0,
            margin: 0,
          },
          bgcolor: "#ffffff",
          borderRadius: 0.5,
        }}
      >
        <Box
          sx={{
            marginRight: 2,
            position: "absolute",
            marginLeft: 0.5,
          }}
        />
        <ListItem alignItems="flex-start">
          <Link href={`/profile/${checkFriendReq[0].requesterId}`} passHref>
            <ListItemAvatar sx={{ marginRight: "5px", cursor: "pointer" }}>
              <Avatar alt="Remy Sharp" />
            </ListItemAvatar>
          </Link>

          <ListItemText
            primaryTypographyProps={{ style: text }}
            primary={
              <Typography
                sx={{ display: "inline" }}
                component="span"
                variant="body2"
                color="text.primary"
              >
                {checkFriendReq[0].displayName} {message}
              </Typography>
            }
            secondary={
              <Box sx={{ marginTop: 0.3 }}>
                {statusConditonalRendering(checkFriendReq)}
              </Box>
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
                justifyContent: "flex-end",
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

              <IconButton
                onClick={handleWoopPopperClick}
                sx={{
                  marginLeft: "10px",
                  "&.MuiButtonBase-root": { p: 0, m: 0 },
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
          Mark as read
        </MenuItem>
        <MenuItem dense onClick={() => onRemove()} color="primary">
          Remove this notification
        </MenuItem>
      </Menu>
    </>
  );
};

export default FriendRequest;
