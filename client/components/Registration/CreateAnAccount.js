import { Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function CreateAnAccount() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 2,
        mb: -1,
      }}
    >
      <Typography variant="string" align="center">
        Not yet registered? Create a{" "}
        <Link href="/auth/register/mentor" passHref>
          <MuiLink sx={{ cursor: "pointer" }}>Mentor</MuiLink>
        </Link>{" "}
        or{" "}
        <Link href="/auth/register/member" passHref>
          <MuiLink sx={{ cursor: "pointer" }}>Member</MuiLink>
        </Link>{" "}
        account
      </Typography>
    </Box>
  );
}
