import { Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function MemberStatement({ text, name }) {
  return (
    <Box sx={{ marginY: "0.4rem" }}>
      <Typography variant="body1">
        {text} -
        <Link href="/" passHref>
          <MuiLink sx={{ whiteSpace: "nowrap", marginLeft: 1 }}>{name}</MuiLink>
        </Link>
      </Typography>
    </Box>
  );
}
