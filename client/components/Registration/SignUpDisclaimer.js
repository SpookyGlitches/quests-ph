import { Box, Typography, Link as MuiLink } from "@mui/material";

export default function SignUpDisclaimer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="string"
        sx={{ mt: "1rem", mb: "1rem", fontSize: "12px" }}
        textAlign="center"
      >
        By signing up, I accept the{" "}
        <MuiLink sx={{ cursor: "pointer" }} style={{ textDecoration: "none" }}>
          {/* eslint-disable-next-line */}
          <a href="/landing/terms-of-service">Quests Terms of Service</a>
        </MuiLink>{" "}
        and acknowledge the{" "}
        <MuiLink sx={{ cursor: "pointer" }} style={{ textDecoration: "none" }}>
          {/* eslint-disable-next-line */}
          <a href="/landing/privacy-policy">Privacy Policy</a>
        </MuiLink>
        .
      </Typography>
    </Box>
  );
}
