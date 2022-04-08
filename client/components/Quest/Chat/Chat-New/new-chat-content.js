import React, { useState } from "react";
import {
  Box,
  Autocomplete,
  Chip,
  IconButton,
  List,
  ListItem,
  Select,
  MenuItem,
  ListItemText,
  Typography,
  Grid,
  Avatar,
  ListItemButton,
  ListItemAvatar,
  TextField,
  CircularProgress,
} from "@mui/material";

import Image from "next/image";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import useSWR from "swr";
import axios from "axios";

const newChatContent = () => {
  const [selectedValue, setSelectedValue] = useState();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/chat", {
      selectedValue,
      message,
    });

    selectedValue();
    setMessage("");
  };

  const { data, error } = useSWR("/chats/new");

  if (error) return <p>Failed to load</p>;
  if (!data) return <CircularProgress />;

  console.log(selectedValue);

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box>
        <Box>
          <Select
            sx={{ height: "70px" }}
            onChange={(e) => setSelectedValue(e.target.value)}
            fullWidth
          >
            {data.map((user) => (
              <MenuItem
                style={{
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
                value={user.userId}
              >
                <ListItem key={user.userId} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="No">
                      {user.fullName.charAt(0)}
                      {user.fullName.split(" ")[1].charAt(0)}
                    </Avatar>
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      <Grid
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          p: 1,
                          m: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "15px",
                            marginRight: 1,
                            fontWeight: "bold",
                          }}
                        >
                          {user.fullName}
                        </Typography>
                      </Grid>
                    }
                  />
                </ListItem>
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ marginTop: "380px" }}>
          <Box
            sx={{
              marginTop: 0.5,
              width: "100%",
              display: "flex",

              flexDirection: "row",
              padding: 1,
              bgcolor: "background.paper",
            }}
            spacing={3}
          >
            <TextField
              sx={{
                flexGrow: 1,
                marginLeft: 1.5,
              }}
              placeholder="Send a message"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {message !== "" && (
              <IconButton aria-label="delete" type="submit" size="small">
                <SendRoundedIcon sx={{ color: "#755cde" }} />
              </IconButton>
            )}
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default newChatContent;
