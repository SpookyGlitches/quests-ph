import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/Auth/AuthHeader";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <AuthLayout>
      <AuthHeader subtitle="Sign in to your account" />
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          required
          id="filled-required"
          label="Email Address"
        />
        <TextField
          fullWidth
          id="filled-password-input"
          label="Password"
          name="password"
          type={showPassword ? "text" : "password"}
          autoComplete="current-password"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Button variant="contained">Sign In</Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="string" align="center">
          Not yet registered?{" "}
          <Link href="/auth/register/member" passHref>
            <MuiLink sx={{ cursor: "pointer" }}>Create an account</MuiLink>
          </Link>
        </Typography>
        <Typography variant="string" align="center">
          Forgot password?{" "}
          <Link href="/auth/reset" passHref>
            <MuiLink sx={{ cursor: "pointer" }}>Click here</MuiLink>
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
