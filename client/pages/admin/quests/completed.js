import { getSession } from "next-auth/react";
import { Box, Typography, Grid } from "@mui/material";
import Link from "next/link";
import useSWR from "swr";
import * as React from "react";
import DataTable from "../../../components/Admin/Table/QuestsTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";

export default function Index() {
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
          width: "100%",
          mb: 5,
        }}
      >
        <Typography sx={{ mt: 3, color: "white", fontSize: "20px" }}>
          Quests Page
        </Typography>
        <h2 style={{ color: "white" }}>
          You have {questsData?.length} completed Quests!
        </h2>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
              <Link href="/admin/quests" passHref>
                <a href="replace">New</a>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
              &nbsp; | &nbsp;
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
              <Link href="/admin/quests/completed" passHref>
                <a href="replace">
                  <strong>Completed</strong>
                </a>
              </Link>
            </Typography>
          </Grid>
        </Grid>
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
          path="completed"
        />
      </Box>
    </AdminLayout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/landing",
      },
    };
  }
  if (session) {
    if (session.user.role !== "admin") {
      return {
        redirect: {
          permanent: false,
          destination: "/",
        },
      };
    }
  }
  return {
    props: {},
  };
}
