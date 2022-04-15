import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthHeader from "../../components/Auth/AuthHeader";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email,
      password,
      callbackUrl: `/admin/`,
      redirect: false,
    }).then((result) => {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError(
            "The email or password you entered isn't registered to an account.",
          );
          setHasError(true);
        } else if (result.status === 403) {
          setLoginError("Please verify your account.");
          setHasError(true);
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        gap: 3,
        padding: {
          xs: "4rem",
          md: "10rem",
        },
      }}
    >
      <AuthHeader subtitle="Admin Sign In" />
      <Stack direction="column" spacing={2}>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            id="filled-required"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            error={hasError}
          />

          <TextField
            fullWidth
            id="filled-password-input"
            label="Password"
            name="password"
            value={password}
            error={hasError}
            helperText={hasError ? loginError : ""}
            onChange={(e) => setPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            sx={{ mb: 3 }}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", color: "red", align: "center", mb: 2 }}
            />
          </Box>
          <Button variant="contained" type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </Stack>
    </Box>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (session.user.role !== "admin") {
    return {
      redirect: {
        destination: "/",
      },
    };
  }

  return {
    props: {},
  };
}
