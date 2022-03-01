import { Stack, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <Stack
        spacing={4}
        alignItems="center"
        justifyContent="center"
        borderRadius="1rem"
        sx={{ background: "#f5f5f5", margin: "5rem", padding: "5rem" }}
      >
        <Typography variant="h1" sx={{}}>
          404
        </Typography>
        <Typography variant="h6" sx={{ mt: "1rem" }}>
          This page could not be found
        </Typography>

        <Typography sx={{ mt: "1rem" }}>
          <Link href="/">
            <MuiLink sx={{ color: "#755cde", fontSize: "1rem" }}>
              Go Back Home
            </MuiLink>
          </Link>
        </Typography>
      </Stack>
    </>
  );
}
