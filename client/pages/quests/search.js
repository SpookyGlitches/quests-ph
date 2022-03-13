import React from "react";

import {
  Button,
  Box,
  Stack,
  Typography,
  FormControl,
  Pagination,
  Select,
  Paper,
  MenuItem,
} from "@mui/material";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AppLayout from "../../components/Layouts/AppLayout";
import QuestsList from "../../components/Quest/QuestsList";

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
              Available Quests
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
            <Button
              sx={{ maxHeight: "45px" }}
              variant="contained"
              startIcon={<ArrowBackIcon />}
              onClick={handleBankIcon}
            >
              Back{" "}
            </Button>

            <FormControl sx={{ minWidth: 100 }}>
              <Select sx={{ height: "80%" }} displayEmpty>
                <MenuItem>Health</MenuItem>
                <MenuItem>Health</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box m={2} mp={{ sx: 1, sm: 2, md: 1 }}>
            <QuestsList hasJoined />
          </Box>

          <Stack
            p={{ xs: 1, sm: 2, md: 3 }}
            style={{ width: "40%", margin: "auto" }}
          >
            <Pagination variant="outlined" shape="rounded" count={5} />
          </Stack>
        </Paper>
      </Box>
    </AppLayout>
  );
};

export default index;
