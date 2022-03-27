import { Box, TextField } from "@mui/material";
// import SearchBar from "../../../components/Admin/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import * as React from "react";
import DataTable from "../../../components/Admin/Table/DataTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
  const [search, setSearch] = React.useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };
  const applicationsData = [
    {
      id: 1,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Losing Weight",
    },
    {
      id: 2,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Make more friends",
    },
    {
      id: 3,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Become a good developer",
    },
    {
      id: 4,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Gaining weight",
    },
    {
      id: 5,
      party_leader: "rjsubmit",
      status: "Active",
      wish: "Lose more friends",
    },
  ];

  return (
    <AdminLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          margin: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            flexDirection: "row",
          }}
        >
          {/* <SearchBar /> */}
          <TextField
            label="Search"
            variant="outlined"
            name="search"
            value={search}
            onChange={handleSearch}
            sx={{
              borderRadius: 1,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          />
        </Box>
        <DataTable
          tableData={applicationsData}
          sx={{
            margin: "2rem",
          }}
          page="quests"
        />
      </Box>
    </AdminLayout>
  );
}
