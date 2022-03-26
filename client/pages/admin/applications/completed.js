// import SearchBar from "../../../components/Admin/Search";
import { Box, TextField } from "@mui/material";
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
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
    },
    {
      id: 2,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
    },
    {
      id: 3,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
    },
    {
      id: 4,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
    },
    {
      id: 5,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
    },
  ];

  return (
    <AdminLayout>
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
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
          headingColumns={["ID", "Name", "Email", "Status"]}
          sx={{
            margin: "2rem",
          }}
          page="applications"
          path="completed"
        />
      </Box>
    </AdminLayout>
  );
}
