import React from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Avatar,
  AvatarGroup,
} from "@mui/material";

import { deepOrange, deepPurple } from "@mui/material/colors";

const banList = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        sx={{
          p: 1,
          m: 1,
        }}
        spacing={3}
      ></Box>

      <Box
        sx={{
          p: 1,
          m: 3,
        }}
      >
        <Typography variant="h4" sx={{ color: "#755cde", marginTop: "-1em" }}>
          Bans
        </Typography>

        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <FormGroup>
            <FormControlLabel
              sx={{ marginLeft: "2px" }}
              control={
                <Checkbox
                  sx={{
                    "&.MuiCheckbox-root": {
                      margin: 0,
                      padding: 0,
                    },
                  }}
                />
              }
              label="Task 2"
              checked
            />
          </FormGroup>

          <Typography>Today 11:50 PM</Typography>
          <Typography>30 pts</Typography>
          <AvatarGroup>
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
            <Avatar sx={{ width: 17, height: 17 }} />
          </AvatarGroup>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <FormGroup>
            <FormControlLabel
              sx={{ marginLeft: "2px" }}
              control={
                <Checkbox
                  sx={{
                    "&.MuiCheckbox-root": {
                      margin: 0,
                      padding: 0,
                    },
                  }}
                />
              }
              label="Task 1"
              checked
            />
          </FormGroup>

          <Typography>Today 11:50 PM</Typography>
          <Typography>30 pts</Typography>

          <AvatarGroup>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepOrange[500] }}>
              RJ
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              EARL
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              JERBY
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              JERBY
            </Avatar>
            <Avatar sx={{ width: 17, height: 17, bgcolor: deepPurple[500] }}>
              JERBY
            </Avatar>
          </AvatarGroup>
        </Grid>
      </Box>

      <Box
        sx={{
          p: 1,
          m: 1,
        }}
        spacing={3}
      ></Box>
    </Box>
  );
};

export default banList;
