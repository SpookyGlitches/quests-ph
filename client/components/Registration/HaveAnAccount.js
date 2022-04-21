import { Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function HaveAnAccount() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: -1,
      }}
    >
      <Typography variant="string" align="center">
        Have an account already?{" "}
        <Link href="/auth/login" passHref>
          <MuiLink sx={{ cursor: "pointer" }}>Login</MuiLink>
        </Link>{" "}
        instead.
      </Typography>
    </Box>
  );
}
