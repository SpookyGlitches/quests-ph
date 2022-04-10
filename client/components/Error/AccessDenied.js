import { Box, Stack, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function Custom403() {
  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "background.default",
          margin: "7rem",
          padding: "5rem",
        }}
      >
        <Typography variant="h1" sx={{}}>
          Forbidden
        </Typography>
        <Typography variant="h5" sx={{ mt: "1rem" }}>
          You are unauthorized to view this page
        </Typography>

        <Typography sx={{ mt: "1rem" }}>
          <Link href="/" passHref>
            <MuiLink
              sx={{ color: "#755cde", fontSize: "1rem", fontWeight: "medium" }}
            >
              Home
            </MuiLink>
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
}
