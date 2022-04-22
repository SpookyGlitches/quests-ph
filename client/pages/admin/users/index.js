import { Box, Typography } from "@mui/material";
import Link from "next/link";
import * as React from "react";
import useSWR from "swr";
import BasicTable from "../../../components/Admin/Table/UsersTable";
import AdminLayout from "../../../components/Layouts/AdminLayout";
import { getSession } from "next-auth/react";

export default function Index() {
  const { data: usersData, error } = useSWR(`/admin/users/getUsers`);

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
        <h2 style={{ color: "white" }}>
          You have {usersData?.length} active users!
        </h2>
        <Typography sx={{ mt: 2, color: "white", fontSize: "18px" }}>
          <Link href="/admin/users" passHref>
            <a href="replace">
              <strong>All</strong>
            </a>
          </Link>{" "}
          <Link href="/admin/users/removed" passHref>
            <a href="replace">Removed</a>
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
          <BasicTable tableData={usersData} page="users" path="all" />
        </Box>
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
