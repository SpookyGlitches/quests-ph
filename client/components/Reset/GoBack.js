import { Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function GoBackHome() {
  return (
    <Typography variant="string" align="center">
      Go Back{" "}
      <Link href="/" passHref>
        <MuiLink sx={{ cursor: "pointer" }}>Home</MuiLink>
      </Link>
    </Typography>
  );
}
