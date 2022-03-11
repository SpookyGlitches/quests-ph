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
      {/* <Box maxWidth="sm" sx={{ ml: 10 }}>
        <Typography
          variant="h5"
          sx={{
            color: "primary.main",
          }}
        >
          <Link href="/landing">Quests</Link>
        </Typography>
      </Box>
      <Box maxWidth="sm" sx={{ mr: 10 }}>
        <Typography variant="h6">
          <Link color="inherit" href="auth/login">
            Login
          </Link>
        </Typography>
      </Box> */}
    </Box>
  );
};

export default Header;
