import { Button, Stack, Typography, Link as MuiLink } from "@mui/material";
import { useRouter } from "next/router";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import AuthHeader from "../../../components/Auth/AuthHeader";

export default function VerifyEmail() {
  const router = useRouter();
  const { emailAddress } = router.query;

  return (
    <AuthLayout>
      <AuthHeader subtitle="Verify your email address" />
      <Stack spacing={4} sx={{ my: 1, alignItems: "center" }}>
        <Typography variant="h6">
          We have sent an email to {emailAddress}.
        </Typography>
        <Typography variant="string">
          You need to verify your email to continue. Please click on the link
          that we have sent to you. If you have not received an email or want to
          resend the email, please click the button below.
        </Typography>
        <Button variant="contained" sx={{}}>
          Resend Verification Email
        </Button>
        <Typography>
          <MuiLink
            sx={{ cursor: "pointer" }}
            style={{ textDecoration: "none" }}
          >
            {/* eslint-disable-next-line */}
            <a href="/auth/login">Login </a>
          </MuiLink>
          to your account.
        </Typography>
      </Stack>
    </AuthLayout>
  );
}
