import React, { useState } from "react";
import AppLayout from "../../components/Layouts/AppLayout";

import {
  Button,
  Box,
  CardMedia,
  CardContent,
  Stack,
  Typography,
  TextField,
  FormControl,
  Pagination,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

import ScheduleIcon from "@mui/icons-material/Schedule";
import AddIcon from "@mui/icons-material/Add";

const index = () => {
  const handleBankIcon = () => {
    window.location.href = "/quests";
  };

  return (
    <AppLayout>
      <Box p={{ xs: 1, sm: 2, md: 3 }}>
        <Paper>
          <Box p={3}>
            <Typography variant="h3" sx={{ color: "#755cde" }}>
              Quests
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              m: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
            spacing={3}
          >
            <TextField
              sx={{ flexGrow: 1 }}
              id="standard-basic"
              label="Search for Quest"
              variant="standard"
            />

            <Button
              sx={{ maxHeight: "45px", marginRight: 2 }}
              variant="contained"
              startIcon={<AddIcon />}
            >
              Quest{" "}
            </Button>

            <FormControl sx={{ minWidth: 80 }}>
              <Select sx={{ height: "80%" }} displayEmpty>
                <MenuItem>Health</MenuItem>
                <MenuItem>Health</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box m={2} mp={{ sx: 1, sm: 2, md: 1 }}>
            <Paper
              sx={{ display: "flex", flexDirection: "row", marginBottom: 3 }}
            >
              <CardMedia
                component="img"
                sx={{
                  width: 170,
                  height: 150,
                  borderRadius: 1,
                }}
                image="https://wallpaperaccess.com/full/270177.jpg"
                alt="Live from space album cover"
              />
              <CardContent
                sx={{
                  marginLeft: "5px",
                }}
              >
                <Typography variant="h6">
                  DO KETO DIET THREE TIME A WEEK
                </Typography>
                <Typography variant="overline" noWrap>
                  <ScheduleIcon sx={{ color: "#755cde", fontSize: 10 }} />{" "}
                  November 8 - December 4
                </Typography>
              </CardContent>
            </Paper>

            <Paper sx={{ display: "flex", flexDirection: "row" }}>
              <CardMedia
                component="img"
                sx={{
                  width: 170,
                  height: 150,
                  borderRadius: 1,
                }}
                image="https://wallpaperaccess.com/full/270177.jpg"
                alt="Live from space album cover"
              />
              <CardContent
                sx={{
                  marginLeft: "5px",
                }}
              >
                <Typography variant="h6">
                  DO KETO DIET THREE TIME A WEEK
                </Typography>
                <Typography variant="overline" noWrap>
                  <ScheduleIcon sx={{ color: "#755cde", fontSize: 10 }} />{" "}
                  November 8 - December 4
                </Typography>
              </CardContent>
            </Paper>
          </Box>

          <Stack
            p={{ xs: 1, sm: 2, md: 3 }}
            style={{ width: "33%", margin: "auto" }}
          >
            <Pagination variant="outlined" shape="rounded" count={4} />
          </Stack>
        </Paper>
      </Box>
    </AppLayout>
  );
};

export default index;
