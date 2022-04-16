import { Box, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";
import BasicTable from "../../../components/Admin/Table/UsersTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
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
        <Box sx={{ marginTop: "0rem" }}>
          <BasicTable tableData={usersData} page="users" path="removed" />
        </Box>
      </Box>
    </AdminLayout>
  );
}
