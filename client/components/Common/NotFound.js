import { Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function NotFound({ height, rootStyles, width, text, child }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        ...rootStyles,
      }}
    >
      <Image
        src="/images/404.svg"
        height={height || 300}
        width={width || 400}
        alt="400"
      />
      <Typography variant="h5" sx={{ mt: 2 }} align="center">
        {text || "This page could not be found."}
      </Typography>
      <Typography sx={{ mt: "1rem" }} variant="body2" align="center">
        <Link href="/" passHref>
          <MuiLink
            sx={{ color: "#755cde", fontSize: "1rem", fontWeight: "medium" }}
          >
            Go back home
          </MuiLink>
        </Link>
      </Typography>
      {child}
    </Box>
  );
}
