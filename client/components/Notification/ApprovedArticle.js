import React, { useState } from "react";
import useSWR from "swr";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  ListItemButton,
  Menu,
  MenuItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
} from "@mui/material";
import { formatDistance } from "date-fns";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import Link from "next/link";

const UserBan = ({
  metadata,
  onClick,
  message,
  createdAt,
  onRemove,
  /* eslint-disable */
  view_status,
}) => {
  const [anchorWoop, setAnchorWoop] = useState(null);
  const [openWoopPopper, setOpenWoopPopper] = useState(false);
  const { data: articleInfo } = useSWR(
    `/admin/articles/${metadata.articleId}/getSingleArticle`,
  );

  if (!articleInfo) return null;

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
          borderRadius: 0.5,
        }}
      >
        <Box sx={{ marginRight: 2, position: "absolute", marginLeft: 0.5 }} />
        <ListItem alignItems="flex-start">
          <ListItemAvatar sx={{ marginRight: "5px" }}>
            <Avatar alt="Remy Sharp" src="/articles/book.svg" />
          </ListItemAvatar>

          <ListItemText
            primaryTypographyProps={{ style: text }}
            primary={
              <Link href="/articles" passHref>
                <Typography
                  sx={{ display: "inline", marginTop: 1 }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {message}
                  <Typography variant="subtitle2" color="primary">
                    {articleInfo.title}
                  </Typography>
                </Typography>
              </Link>
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

export default UserBan;
