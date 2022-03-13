import React from "react";
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
      <List
        sx={{
          bgcolor: "background.paper",
          overflow: "hidden",
        }}
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>

          <ListItemText
            primary={
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                  Monica
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#d4d9d4", fontSize: "14px" }}
                >
                  Today at 4:50 PM
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
                Hi, any idea how can i do x?
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>

          <ListItemText
            primary={
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                  Monica
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#d4d9d4", fontSize: "14px" }}
                >
                  Today at 4:50 PM
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
                Hi, any idea how can i do x?
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>

          <ListItemText
            primary={
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                  Monica
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#d4d9d4", fontSize: "14px" }}
                >
                  Today at 4:50 PM
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
                Hi, any idea how can i do x?
              </Typography>
            }
          />
        </ListItem>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </ListItemAvatar>

          <ListItemText
            primary={
              <Grid sx={{ display: "flex", flexDirection: "row" }}>
                <Typography sx={{ fontSize: "15px", marginRight: 1 }}>
                  Monica
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "#d4d9d4", fontSize: "14px" }}
                >
                  Today at 4:50 PM
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
                Hi, any idea how can i do x?
              </Typography>
            }
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default ChatContent;
