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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthLayout from "../../components/Layouts/AuthLayout";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email,
      password,
      callbackUrl: `localhost:3000/`,
      redirect: false,
    }).then((result) => {
      if (result.error !== null) {
        if (result.status === 401) {
          setLoginError(
            "Your username/password combination was incorrect. Please try again",
          );
        } else {
          setLoginError(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };
  return (
    <AuthLayout>
      <AuthHeader subtitle="Sign in to your account" />
      <Stack direction="column" spacing={2}>
        <Button
          style={{
            borderRadius: 10,
            minHeight: "56px",
            width: "100%",
            backgroundColor: "white",
            color: "black",
            marginTop: "0.5rem",
          }}
          variant="contained"
        >
          <img
            src="/auth/google.png"
            width="15"
            height="15"
            alt="questsgoogle"
          />{" "}
          &nbsp; Login with Google
        </Button>
        <Typography align="center">or</Typography>

        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            required
            id="filled-required"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 3 }}
            error={loginError && loginError}
            helperText={loginError ? loginError : ""}
          />

          <TextField
            fullWidth
            id="filled-password-input"
            label="Password"
            name="password"
            value={password}
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
          <Button variant="contained" type="submit" fullWidth>
            Sign In
          </Button>
        </form>
      </Stack>

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
