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
      username: "grapejuice",
      status: "Ongoing",
      StartDate: "2022-01-10",
      EndDate: "2023-02-10",
    },
    {
      id: 2,
      username: "grapejuice",
      status: "Ongoing",
      StartDate: "2022-01-10",
      EndDate: "2023-02-10",
    },
    {
      id: 3,
      username: "grapejuice",
      status: "Ongoing",
      StartDate: "2022-01-10",
      EndDate: "2023-02-10",
    },
    {
      id: 4,
      username: "grapejuice",
      status: "Ongoing",
      StartDate: "2022-01-10",
      EndDate: "2023-02-10",
    },
    {
      id: 5,
      username: "grapejuice",
      status: "Ongoing",
      StartDate: "2022-01-10",
      EndDate: "2023-02-10",
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
          headingColumns={[
            "ID",
            "Username",
            "Status",
            "Start Date",
            "End Date",
            "Report",
            "Action",
          ]}
          sx={{
            margin: "2rem",
          }}
          page="reports"
          path="ongoing"
        />
      </Box>
    </AdminLayout>
  );
}
