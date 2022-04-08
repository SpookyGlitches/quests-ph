import React from "react";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
  IconButton,
  Paper,
  Tooltip,
  Avatar,
  Typography,
  ListItemButton,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import Link from "next/link";
import useSWR from "swr";

const ChatSidebar = () => {
  const { data, error } = useSWR("/chats");
  if (error) return <p>Failed</p>;
  if (!data) return <CircularProgress />;
  return (
    <Box>
      <Paper
        spacing={2}
        sx={{
          p: 2.5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography>Messaging</Typography>

        <Link href="/chats/new" passHref>
          <Tooltip title="Create New Chat">
            <IconButton size="small">
              <OpenInNewRoundedIcon sx={{ color: "#755cde" }} />
            </IconButton>
          </Tooltip>
        </Link>
      </Paper>
      <Box
        borderRadius={1}
        border={1}
        borderColor="#eeeee4"
        marginTop={1}
        display="column"
        height="490px"
        style={{
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        {data.map((conversation) => (
          <List
            key={conversation.conversationId}
            sx={{
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
          >
            <Link href={`/chats/${conversation.conversationId}`} passHref>
              <ListItemButton divider>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp">R</Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Grid sx={{ display: "flex", flexDirection: "row" }}>
                        <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                          {conversation.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          sx={{
                            color: "#d4d9d4",
                            fontSize: "14px",
                            justifyContent: "flex-end",
                          }}
                        >
                          {/* {formatRelative(
                      subDays(new Date(), 0),
                      new Date(chat.createdAt),
                    )} */}
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
              </ListItemButton>
            </Link>
          </List>
        ))}
      </Box>
    </Box>
  );
};

export default ChatSidebar;
