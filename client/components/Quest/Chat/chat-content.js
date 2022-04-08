import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Box,
  Typography,
  ListItemText,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import ReactScrollableFeed from "react-scrollable-feed";

const ChatContent = () => {
  return (
    <Box
      display="column"
      height="400px"
      style={{
        overflow: "hidden",
        overflowY: "scroll",
      }}
    >
      <Divider>
        <Chip label="Unread Messages" />
      </Divider>
      <ReactScrollableFeed>
        <List
          sx={{
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp">R</Avatar>
            </ListItemAvatar>

            <ListItemText
              primary={
                <Grid sx={{ display: "flex", flexDirection: "row" }}>
                  <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                    ada
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ color: "#d4d9d4", fontSize: "14px" }}
                  >
                    {/* {formatRelative(
                      subDays(new Date(), 0),
                      new Date(chat.createdAt),
                    )} */}
                    asdasd
                  </Typography>
                </Grid>
              }
              secondary={
                <Typography
                  sx={{ display: "inline", fontSize: "15px" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  dasda
                </Typography>
              }
            />
          </ListItem>
        </List>
      </ReactScrollableFeed>
    </Box>
  );
};

export default ChatContent;
