import { Box, Typography } from "@mui/material";
import Link from "next/link";
import { Link as MuiLink } from "@mui/material";

const muiLinkProps = {
  component: "button",
  variant: "body2",
  color: "inherit",
  sx: {
    "&:hover": {
      color: "primary.main",
    },
  },
};

export default function QuestHeader() {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "background.paper",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "1.5rem",
        paddingBottom: "0.6rem",
        flex: 1,
        maxHeight: "20rem",
        gap: 2,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="div" variant="body2">
          Health
        </Typography>
        <Box sx={{ marginTop: "0.2rem" }}>
          <Typography variant="h4" align="center">
            Run 5 km daily for 3 months
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          columnGap: 2,
          textOverflow: "hidden",
          justifyContent: "center",
          rowGap: 1,
        }}
      >
        <Link href="/" passHref>
          <MuiLink {...muiLinkProps}>Overview</MuiLink>
        </Link>
        <Link href="/" passHref>
          <MuiLink {...muiLinkProps}>Posts</MuiLink>
        </Link>
        <Link href="/" passHref>
          <MuiLink {...muiLinkProps}>Tasks</MuiLink>
        </Link>
        <Link href="/" passHref>
          <MuiLink {...muiLinkProps}>Party</MuiLink>
        </Link>
        <Link href="/" passHref>
          <MuiLink {...muiLinkProps}>Wiki</MuiLink>
        </Link>
        <Link href="/" passHref>
          <MuiLink {...muiLinkProps}>Chat</MuiLink>
        </Link>
      </Box>
    </Box>
  );
}
