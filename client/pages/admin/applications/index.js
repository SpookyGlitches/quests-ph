import { getSession } from "next-auth/react";
import { Box, Typography, Grid } from "@mui/material";
import * as React from "react";
import useSWR from "swr";
import Link from "next/link";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import BasicTable from "../../../components/Admin/Table/ApplicationTable";

export default function Index() {
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
          width: "100%",
          mb: 5,
        }}
      >
        <Typography sx={{ mt: 3, color: "white", fontSize: "20px" }}>
          Applications Page
        </Typography>
        <h2 style={{ color: "white" }}>
          You have {applicationsData?.length} new applications!
        </h2>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Typography
              sx={{
                mt: 2,
                color: "white",
                fontSize: "18px",
              }}
            >
              <Link href="/admin/applications" passHref>
                <a href="replace">
                  <strong>New</strong>
                </a>
              </Link>
            </Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
              &nbsp; | &nbsp;
            </Typography>
          </Grid>

          <Grid item>
            <Typography
              sx={{
                mt: 2,
                color: "white",
                fontSize: "18px",
              }}
            >
              <Link href="/admin/applications/approved" passHref>
                <a href="replace">Approved</a>
              </Link>
            </Typography>
          </Grid>
        </Grid>
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
          tableData={applicationsData}
          sx={{
            margin: "2rem",
          }}
          page="applications"
          path="new"
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
