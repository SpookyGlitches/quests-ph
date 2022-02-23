import * as React from "react"
import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Link as MuiLink,
} from "@mui/material"
import Link from "next/link"

const MemberRegistrationTwo = () => {
  return (
    <>
      <Stack direction="column" spacing={2}>
        <Typography align="center">or</Typography>
        <TextField
          fullWidth
          required
          style={{}}
          id="filled-required"
          label="Email Address"
          sx={{}}
        />
        <TextField
          fullWidth
          id="filled-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          sx={{}}
        />
        <TextField
          fullWidth
          id="filled-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
          sx={{}}
        />
      </Stack>
      <Button variant="contained" sx={{ mt: "1rem", mb: "1rem" }}>
        Sign Up
      </Button>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="string">
          By signing up, I accept the{" "}
          <MuiLink
            sx={{ cursor: "pointer" }}
            style={{ textDecoration: "none" }}
          >
            <a href="/quests-terms">Quests Terms of Service</a>
          </MuiLink>{" "}
          and acknowledge the{" "}
          <MuiLink
            sx={{ cursor: "pointer" }}
            style={{ textDecoration: "none" }}
          >
            <a href="/privacy-policy">Privacy Policy</a>
          </MuiLink>
          .
        </Typography>
      </Box>
    </>
  )
}

export default MemberRegistrationTwo
