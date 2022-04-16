import { Box, Typography } from "@mui/material";
import * as React from "react";
import useSWR from "swr";
import Link from "next/link";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import BasicTable from "../../../components/Admin/Table/ArticleTable";

export default function Index() {
  const { data: approvedArticles, error } = useSWR(
    `/admin/articles/getApprovedArticles`,
  );

  if (error) {
    console.log(error);
  }
  if (!approvedArticles) {
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
          Articles Page
        </Typography>
        <h2 style={{ color: "white" }}>You have 5 new submissions!</h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/articles" passHref>
            <a href="replace">New</a>
          </Link>{" "}
          <Link href="/admin/articles/completed" passHref>
            <a href="replace">
              <strong>Approved</strong>
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
        <BasicTable
          tableData={approvedArticles}
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
