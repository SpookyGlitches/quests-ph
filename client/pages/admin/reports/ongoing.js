import { Box, Typography } from "@mui/material";
import * as React from "react";
import useSWR from "swr";
import Link from "next/link";
import BasicTable from "../../../components/Admin/Table/ReportsTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
  const { data: reportsData, error } = useSWR(
    `/admin/reports/getOngoingReports`,
  );

  if (error) {
    console.log(error);
  }
  if (!reportsData) {
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
          Reports Page
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
        <BasicTable
          tableData={reportsData}
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
