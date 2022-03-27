import { Box, TextField, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import * as React from "react";
// import SearchBar from "../../../components/Admin/Search";
import Link from "next/link";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import DataTable from "../../../components/Admin/Table/DataTable";

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
      category: "Health",
      link: "haha.com",
      status: "Approved",
    },
    {
      id: 2,
      username: "grapejuice",
      category: "Health",
      link: "haha.com",
      status: "Rejected",
    },
    {
      id: 3,
      username: "grapejuice",
      category: "Health",
      link: "haha.com",
      status: "Rejected",
    },
    {
      id: 4,
      username: "grapejuice",
      category: "Health",
      link: "haha.com",
      status: "Approved",
    },
    {
      id: 5,
      username: "grapejuice",
      category: "Health",
      link: "haha.com",
      status: "Approved",
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
        <h2 style={{ color: "white" }}>You have 5 new submissions!</h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/articles" passHref>
            <a href="replace">New</a>
          </Link>{" "}
          <Link href="/admin/articles/completed" passHref>
            <a href="replace">
              <strong>Completed</strong>
            </a>
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
          page="articles"
          path="completed"
        />
      </Box>
    </AdminLayout>
  );
}
