import { Box, TextField, Typography } from "@mui/material";
import Link from "next/link";
// import SearchBar from "../../../components/Admin/Search";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import useSWR from "swr";
import * as React from "react";
import DataTable from "../../../components/Admin/Table/DataTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
  const [search, setSearch] = React.useState("");
  const handleSearch = (event) => {
    setSearch(event.target.value);
    console.log(search);
  };
  const { data: questsData, error } = useSWR(
    `/admin/quests/getCompletedQuests`,
  );

  if (error) {
    console.log(error);
  }
  if (!questsData) {
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
          Quests Page
        </Typography>
        <h2 style={{ color: "white" }}>You have 5 new reports!</h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/quests" passHref>
            <a href="replace">New</a>
          </Link>{" "}
          <Link href="/admin/quests/completed" passHref>
            <a href="replace">
              <strong>Completed</strong>
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
          tableData={questsData}
          sx={{
            margin: "2rem",
          }}
          page="quests"
        />
      </Box>
    </AdminLayout>
  );
}
