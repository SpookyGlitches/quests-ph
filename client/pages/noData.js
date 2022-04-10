import { Stack, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function noDataPage() {
  return (
    <Stack
      spacing={4}
      alignItems="center"
      justifyContent="center"
      borderRadius="1rem"
      sx={{
        background: "background.default",
        margin: "5rem",
        padding: "5rem",
      }}
    >
      <Typography variant="h2" sx={{}}>
        Oops. Something went wrong...
      </Typography>
      <Typography variant="h6" sx={{ mt: "1rem" }}>
        The data for this page cannot be loaded or is not found.
      </Typography>

      <Typography sx={{ mt: "1rem" }}>
        <Link href="/" passHref>
          <MuiLink
            sx={{ color: "#755cde", fontSize: "1rem", fontWeight: "medium" }}
          >
            Go Back Home
          </MuiLink>
        </Link>
      </Typography>
    </Stack>
  );
}
