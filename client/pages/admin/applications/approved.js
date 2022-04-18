import { Box, Typography } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import * as React from "react";
import DataTable from "../../../components/Admin/Table/ApplicationTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
  const { data: applicationsData, error } = useSWR(
    `/admin/applications/getApprovedApplications`,
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
        <h2 style={{ color: "white" }}>
          You have {applicationsData?.length} new applications!
        </h2>
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
