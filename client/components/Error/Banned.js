import { Box, Stack, Typography, Button } from "@mui/material";
import { signOut } from "next-auth/react";

export default function Banned() {
  return (
    <Stack spacing={4}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          background: "background.default",
          margin: "7rem",
          padding: "5rem",
        }}
      >
        <Typography variant="h1" sx={{}}>
          Uh-oh!
        </Typography>
        <Typography variant="h5" sx={{ mt: "1rem" }}>
          You are unauthorized to view this page because you are banned.
        </Typography>
        <Button
          onClick={() =>
            signOut({
              callbackUrl: "/landing",
            })
          }
        >
          Sign Out
        </Button>
      </Box>
    </Stack>
  );
}
