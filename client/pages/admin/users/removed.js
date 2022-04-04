import { Box, Grid, TextField, Typography } from "@mui/material";
import Link from "next/link";
// import SearchBar from "../../../components/Admin/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import * as React from "react";
import useSWR from "swr";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import BasicTable from "../../../components/Admin/Table/DataTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
  const [filter, setFilter] = React.useState("");
  const [search, setSearch] = React.useState("");
  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log(filter);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };
  const { data: usersData, error } = useSWR(`/admin/users/getRemovedUsers`);

  if (error) {
    console.log(error);
  }
  if (!usersData) {
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
          Users Page
        </Typography>
        <h2 style={{ color: "white" }}>You have 5 new applications!</h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/users" passHref>
            <a href="replace">All</a>
          </Link>{" "}
          <Link href="/admin/users/removed" passHref>
            <a href="replace">
              <strong>Removed</strong>
            </a>
          </Link>
        </Typography>
      </Box>
      <Box
        sx={{
          backgroundColor: "background.paper",
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            align: "left",
          }}
        >
          <Grid container justifyContent="flex-start">
            <FormControl style={{ width: "30%" }}>
              <InputLabel id="demo-simple-select-label">Filter</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={0}>Admin</MenuItem>
                <MenuItem value={1}>Mentor</MenuItem>
                <MenuItem value={2}>Member</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid container justifyContent="flex-end">
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
          </Grid>
        </Box>

        <Box sx={{ marginTop: "0rem" }}>
          <BasicTable tableData={usersData} page="users" />
        </Box>
      </Box>
    </AdminLayout>
  );
}
