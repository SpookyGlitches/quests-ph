import React, { useState } from "react";
import AppLayout from "../../components/Layouts/AppLayout";
import {
  Button,
  Box,
  Tooltip,
  Container,
  Typography,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Divider,
  ListItem,
  List,
} from "@mui/material";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

const index = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [unread, setRead] = useState(true);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [markallread, setMarkAllRead] = useState(true);

  const readHandler = () => {
    setRead(false);
  };

  const markAllRead = () => {
    setMarkAllRead(false);
  };

  return (
    <AppLayout>
      <Box
        sx={{
          width: "100%",
          backgroundColor: "white",
          padding: "1rem",
        }}
      >
        <Container sx={{ width: "70vw", marginLeft: 1 }}>
          {/* <PostsList posts={data} /> */}
          <Typography variant="h4" sx={{ cmarginLeft: 0, color: "#755cde" }}>
            Notifications
            <Tooltip title="Mark all as read" followCursor>
              <Button
                onClick={markAllRead}
                display="flex"
                directon="flex-start"
                endIcon={<MarkEmailReadIcon style={{ fontSize: 30 }} />}
              />
            </Tooltip>
          </Typography>

          <List sx={{ width: "70vw", bgcolor: "background.paper" }}>
            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>

              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      15 hours ago
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
              {unread && markallread ? (
                <Button onClick={readHandler}>
                  <FiberManualRecordIcon style={{ fontSize: 15 }} />
                </Button>
              ) : (
                []
              )}
            </ListItem>

            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      3d
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      3d
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      3d
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      3d
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
              {unread && markallread ? (
                <Button onClick={readHandler}>
                  <FiberManualRecordIcon style={{ fontSize: 15 }} />
                </Button>
              ) : (
                []
              )}
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem button alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      3d
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
              {unread && markallread ? (
                <Button onClick={readHandler}>
                  <FiberManualRecordIcon style={{ fontSize: 15 }} />
                </Button>
              ) : (
                []
              )}
            </ListItem>
          </List>
        </Container>
      </Box>
    </AppLayout>
  );
};

export default index;