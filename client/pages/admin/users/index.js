import { Box, Grid, TextField } from "@mui/material";
// import SearchBar from "../../../components/Admin/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import * as React from "react";
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
  const usersData = [
    {
      id: 1,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 2,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 3,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 4,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
    },
    {
      id: 5,
      username: "grapejuice",
      name: "Ninomae Inanis",
      email: "ninomae@gmail.com",
      type: "Admin",
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
          <BasicTable
            tableData={usersData}
            headingColumns={[
              "ID",
              "Username",
              "Name",
              "Email",
              "Type",
              "Action",
            ]}
            page="users"
          />
        </Box>
      </Box>
    </AdminLayout>
  );
}
