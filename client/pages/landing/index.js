import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Box, Grid } from "@mui/material";
import { getSession } from "next-auth/react";
import LandingLayout from "../../components/Layouts/LandingLayout";

export default function Index() {
  return (
    <LandingLayout>
      <Grid container alignItems="center" rowSpacing={6}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              paddingX: 4,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3">
              We help individuals achieve their goals.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 6, marginBottom: 4 }}>
              We give our users the chance to collaborate with others by either
              being a mentor or a mentee through the WOOP (Wish, Outcome,
              Obstacle, Plan) method.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: ["column", null, "row"],
                gap: 2,
              }}
            >
              <Link href="/auth/register/member" passHref>
                <Button variant="contained">Join as Member</Button>
              </Link>
              <Link href="/auth/register/mentor" passHref>
                <Button variant="contained">Join as Mentor</Button>
              </Link>
            </Box>
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
    </LandingLayout>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
