import {
  Button,
  Box,
  Typography,
  Paper,
  TextField,
  IconButton,
} from "@mui/material";
import Link from "next/link";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { useDebounce } from "use-debounce";
import { useState } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import QuestFilters from "../../components/Search/QuestFilters";
import AppLayout from "../../components/Layouts/AppLayout";
import QuestsList from "../../components/Quest/QuestsList";

export default function Index() {
  const [text, setText] = useState("");
  const [searchText] = useDebounce(text, 2000);

  const [filterParams, setFilterParams] = useState(() => ({
    category: ["HEALTH", "SOCIAL", "CAREER"],
    status: ["ACTIVE", "COMPLETED"],
  }));

  const handleSearchChange = (event) => {
    setText(event.target.value);
  };

  return (
    <Paper sx={{ p: 3, display: "flex", gap: 5, flexDirection: "column" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4" color="primary">
          Quests
        </Typography>
        <Link href="/quests/create" passHref>
          <Button variant="contained" startIcon={<AddRoundedIcon />}>
            New Quest
          </Button>
        </Link>
      </Box>
      <Box sx={{}}>
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          size="small"
          value={text}
          onChange={handleSearchChange}
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 1,
            flexGrow: 1,
          }}
          InputProps={{
            startAdornment: (
              <IconButton size="small">
                <SearchRoundedIcon />
              </IconButton>
            ),
          }}
        />
        <QuestFilters
          filterParams={filterParams}
          rootStyles={{
            display: "flex",
            columnGap: 3,
            rowGap: 1,
            mt: 3,
            flexWrap: "wrap",
          }}
          setFilterParams={setFilterParams}
        />
      </Box>

      <QuestsList
        searchParams={{ ...filterParams, take: 5, search: searchText }}
        url="/quests"
      />
    </Paper>
  );
}

Index.getLayout = function getLayout(page) {
  return <AppLayout>{page}</AppLayout>;
};
