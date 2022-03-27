import { Box, TextField, Typography } from "@mui/material";
// import SearchBar from "../../../components/Admin/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import * as React from "react";
import Link from "next/link";
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
        m="auto"
        alignItems="center"
        direction="column"
        justifyContent="center"
        sx={{
          backgroundColor: "primary.main",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
          width: "50%",
          mb: 5,
        }}
      >
        <Typography sx={{ mt: 3, color: "white", fontSize: "20px" }}>
          Hello Admin
        </Typography>
        <h2 style={{ color: "white" }}>You have 5 new reports!</h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/reports" passHref>
            <a href="replace">New</a>
          </Link>{" "}
          <Link href="/admin/reports/ongoing" passHref>
            <a href="replace">
              <strong>Ongoing</strong>
            </a>
          </Link>{" "}
          <Link href="/admin/reports/completed" passHref>
            <a href="replace">Completed</a>
          </Link>
        </Typography>
      </Box>
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
