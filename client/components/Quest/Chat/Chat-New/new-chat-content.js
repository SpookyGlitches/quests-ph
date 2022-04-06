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
} from "@mui/material";

import Image from "next/image";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import axios from "axios";

//implement search here

const dummy_data = [
  {
    id: 1,
    name: "RJ",
    image: "",
  },
  {
    id: 2,
    name: "JERBY",
  },
  {
    id: 3,
    name: "MONICA",
  },
  {
    id: 4,
    name: "MONICA",
  },
  {
    id: 5,
    name: "MONICA",
  },
  {
    id: 1,
    name: "RJ",
  },
  {
    id: 2,
    name: "JERBY",
  },
  {
    id: 3,
    name: "MONICA",
  },
  {
    id: 4,
    name: "MONICA",
  },
  {
    id: 5,
    name: "MONICA",
  },
];

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
            {dummy_data.map((item) => (
              <MenuItem
                style={{
                  overflow: "hidden",
                  overflowY: "scroll",
                }}
                value={item.id}
              >
                <ListItem key={item.id} alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp">R</Avatar>
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
                          {item.name}
                        </Typography>
                      </Grid>
                    }
                  />
                </ListItem>
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ marginTop: "300px" }}>
          <Box
            sx={{
              height: "125px",
              marginTop: 0.5,
              width: "100%",
              display: "flex",

              flexDirection: "row",
              padding: 1,
              bgcolor: "#dce0e6",
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
