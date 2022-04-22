import { getSession, signIn } from "next-auth/react";
import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import AuthHeader from "../../components/Auth/AuthHeader";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [hasError, setHasError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  // eslint-disable-next-line
  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    if (value === process.env.NEXT_PUBLIC_ADMIN_SECRET_KEY) {
      enqueueSnackbar("You may now login, admin");
      setOpen(false);
    } else {
      enqueueSnackbar("Wrong Key");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    signIn("credentials", {
      email,
      password,
      callbackUrl: `/admin`,
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
        router.push("/admin");
      }
    });
  };

  return (
    <Box
      sx={{
        alignItems: "center",
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{
          backdropFilter: "blur(5px)",
          backgroundColor: "rgba(0,0,20,0.3)",
        }}
      >
        <DialogTitle id="alert-dialog-title">
          This page is off limits &#128683;
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This page can only be accessed by authorized users. To proceed,
            enter the admin key.
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              fullWidth
              name="adminkey"
              id="adminkey"
              placeholder="Input here"
              label="Admin key"
              value={value}
              onChange={handleChange}
              type="password"
              sx={{ textAlign: "center" }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Disagree</Button> */}
          <Button onClick={handleClose} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
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
