import { getSession } from "next-auth/react";
import Image from "next/image";
import { Typography, Box, Grid } from "@mui/material";
import AdminLayout from "../../components/Layouts/AdminLayout";

export default function Users() {
  return (
    <AdminLayout>
      <Grid container alignItems="center" rowSpacing={6}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              paddingX: 4,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              mt: 10,
            }}
          >
            <Typography variant="h4">
              We help individuals achieve their goals.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 6, marginBottom: 4 }}>
              We give our users the chance to collaborate with others by either
              being a mentor or a mentee through the WOOP (Wish, Outcome,
              Obstacle, Plan) method.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box>
            {/* https://undraw.co/search */}
            <Image
              layout="responsive"
              src="/landing/social_friends.svg"
              alt="social_friends"
              height="180"
              width="300"
            />
          </Box>
        </Grid>
      </Grid>
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
