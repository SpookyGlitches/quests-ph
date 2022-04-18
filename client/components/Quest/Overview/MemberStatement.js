import { Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";

export default function MemberStatement({ text, user }) {
  return (
    <Box sx={{ marginY: "0.4rem" }}>
      <Typography variant="body1" sx={{ wordBreak: "break-all" }}>
        {text} -
        <Link href={`/profile/${user.userId}`} passHref>
          <MuiLink sx={{ whiteSpace: "nowrap", marginLeft: 1 }}>
            {user.displayName}
          </MuiLink>
        </Link>
      </Typography>
    </Box>
  );
}
