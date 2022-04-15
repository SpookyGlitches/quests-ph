import { Box, Typography } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import * as React from "react";
import DataTable from "../../../components/Admin/Table/QuestsTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
  const { data: questsData, error } = useSWR(`/admin/quests/getQuests`);

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
        <h2 style={{ color: "white" }}>
          You have {questsData?.length} new reports!
        </h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/quests" passHref>
            <a href="replace">
              <strong>New</strong>
            </a>
          </Link>{" "}
          <Link href="/admin/quests/completed" passHref>
            <a href="replace">Completed</a>
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
        <DataTable
          tableData={questsData}
          sx={{
            margin: "2rem",
          }}
          page="quests"
          path="new"
        />
      </Box>
    </AdminLayout>
  );
}
