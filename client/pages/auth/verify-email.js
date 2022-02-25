import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/auth/AuthHeader";

export default function VerifyEmail() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="Sign in to your account" />
      <Stack spacing={4} sx={{ my: 2 }}>
        <Typography variant="h6">
          We have sent an email to ninomaeianis@hololive.com.
        </Typography>
        <Typography variant="string">
          You need to verify your email to continue. Please click on the link
          that we have sent to you. If you have not received an email or want to
          resend the email, please click the button below.
        </Typography>
      </Stack>
      <Button variant="contained" sx={{ marginTop: 2 }}>
        Resend Verification Email
      </Button>
    </AuthLayout>
  );
}
