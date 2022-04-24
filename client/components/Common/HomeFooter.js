import { Typography, Link as MuiLink, Box } from "@mui/material";
import Link from "next/link";

function Copyright() {
  const year = new Date().getFullYear();
  return (
    <Typography variant="caption" sx={{}}>
      {`Copyright © Quests ${year}`}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: {
          xs: "space-around",
          lg: "center",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="subtitle2">
          <Link href="/landing/privacy-policy" passHref>
            <MuiLink>Privacy Policy</MuiLink>
          </Link>
        </Typography>
        <Typography variant="subtitle2">
          <Link href="/landing/terms-of-service" passHref>
            <MuiLink>Terms of Service</MuiLink>
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
