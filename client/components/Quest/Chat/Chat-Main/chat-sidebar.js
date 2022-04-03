import React from "react";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Divider,
  Avatar,
  Typography,
  ListItemButton,
} from "@mui/material";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import Link from "next/link";

const ChatSidebar = () => {
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
        <OpenInNewRoundedIcon />
      </Paper>
      <Box
        borderRadius={1}
        border={1}
        borderColor={"#eeeee4"}
        marginTop={1}
        display="column"
        height="490px"
        style={{
          overflow: "hidden",
          overflowY: "scroll",
        }}
      >
        <List
          sx={{
            bgcolor: "background.paper",
            overflow: "hidden",
          }}
        >
          <Link href={"/chats/asdfadfafa"} passHref>
            <ListItemButton divider>
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
            </ListItemButton>
          </Link>
          <ListItemButton divider>
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
          </ListItemButton>
          <ListItemButton divider>
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
          </ListItemButton>
          <ListItemButton divider>
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
          </ListItemButton>
          <ListItemButton divider>
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
          </ListItemButton>
          <ListItemButton divider>
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
          </ListItemButton>
          <ListItemButton divider>
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
          </ListItemButton>
          <ListItemButton divider>
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
          </ListItemButton>
          <ListItemButton divider>
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
          </ListItemButton>
        </List>
      </Box>
    </Box>
  );
};

export default ChatSidebar;
