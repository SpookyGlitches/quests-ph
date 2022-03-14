import React from "react";

import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  FormControl,
  Pagination,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import AppLayout from "../../components/Layouts/AppLayout";
import QuestsList from "../../components/Quest/QuestsList";

const Index = () => {
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
            <QuestsList hasJoined />
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

export default Index;
