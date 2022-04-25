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
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AuthHeader from "../../components/Auth/AuthHeader";
import AuthLayout from "../../components/Layouts/AuthLayout";
import CreateAnAccount from "../../components/Registration/CreateAnAccount";
import DocumentTitle from "../../components/Common/DocumentTitle";

export default function Login() {
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
      callbackUrl: `/`,
      redirect: false,
    }).then((result) => {
      console.log(result.status);
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
    <AuthLayout>
      <DocumentTitle title="Login or Sign-Up" />
      <AuthHeader subtitle="Sign in to your account" />
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

      <CreateAnAccount />
      <Typography variant="string" align="center">
        Forgot password?{" "}
        <Link href="/auth/reset" passHref>
          <MuiLink sx={{ cursor: "pointer" }}>Click here</MuiLink>
        </Link>
      </Typography>
    </AuthLayout>
  );
}
export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session) {
    if (session.user.role !== "admin") {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
