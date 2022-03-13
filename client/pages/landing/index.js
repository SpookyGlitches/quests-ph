import Image from "next/image";
import Link from "next/link";
import { Typography, Button, Box, Grid } from "@mui/material";
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
            <Typography variant="h4">
              We help individuals achieve their goals through socialization and
              chu.
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 6, marginBottom: 4 }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
