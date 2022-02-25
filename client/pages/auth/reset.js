import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link as MuiLink } from "@mui/material";
import Link from "next/link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";

export default function ResetPassword() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="Reset your password" />
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          required
          style={{}}
          id="filled-required"
          label="Email Address"
        />
      </Stack>
      <Button variant="contained">Reset Password</Button>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* https://stackoverflow.com/questions/66226576/using-the-material-ui-link-component-with-the-next-js-link-component */}
        <Typography variant="string" align="center">
          Not yet registered?{" "}
          <Link href="/" passHref>
            <MuiLink sx={{ cursor: "pointer" }}>Create an account</MuiLink>
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
