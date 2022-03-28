import Link from "next/link";
import { Box, Typography, Link as MuiLink } from "@mui/material";

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 2,
      }}
    >
      <Typography variant="h5">
        <Link href="/landing" passHref>
          <MuiLink>Quests</MuiLink>
        </Link>
      </Typography>
      <Typography variant="subtitle2">
        <Link href="/auth/login" passHref>
          <MuiLink>Login</MuiLink>
        </Link>
      </Typography>
    </Box>
  );
};

export default Header;
