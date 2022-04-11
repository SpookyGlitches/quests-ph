// import SearchBar from "../../../components/Admin/Search";
import { Box, TextField, Typography } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
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

  const { data: applicationsData, error } = useSWR(
    `/admin/applications/getApplications`,
  );

  if (error) {
    console.log(error);
  }
  if (!applicationsData) {
    <div>Loading</div>;
  }

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
          Applications Page
        </Typography>
        <h2 style={{ color: "white" }}>You have 5 new applications!</h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/applications" passHref>
            <a href="replace">New</a>
          </Link>
          {"   "}
          <Link href="/admin/applications/approved" passHref>
            <a href="replace">
              <strong>Approved</strong>
            </a>
          </Link>
          {"   "}
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
          page="applications"
          path="approved"
        />
      </Box>
    </AdminLayout>
  );
}
