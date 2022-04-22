import * as React from "react";
import { useState } from "react";
import { Button, Stack, Typography, Box, Link as MuiLink } from "@mui/material";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import Alert from "@mui/material/Alert";
import axios from "axios";
import AuthLayout from "../../../components/Layouts/AuthLayout";
import AuthHeader from "../../../components/Auth/AuthHeader";

export default function VerifyEmail() {
  const [message, setMessage] = useState(null);
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const { emailAddress } = router.query;
  const email = router.query.emailAddress;
  // eslint-disable-next-line
  const clickMe = (parameter) => (event) => {
    axios({
      method: "POST",
      url: "/api/auth/verify-email",
      data: {
        email: parameter,
      },
    })
      .then(() => {
        setMessage(
          "We have sent another verification email to your registered email address.",
        );
      })
      .catch((error) => {
        setErrorMessage("Your email doesn't exist.");
        console.log(error);
      });
  };

  return (
    <AuthLayout>
      <AuthHeader subtitle="Verify your email address" />
      {errorMessage !== "" ? (
        <Alert severity="error" color="error">
          {errorMessage}
        </Alert>
      ) : (
        ""
      )}
      <Stack spacing={4} sx={{ my: 1, alignItems: "center" }}>
        <Typography variant="h6">
          We have sent an email to {emailAddress}.
        </Typography>
        <Typography variant="string">
          You need to verify your email to continue. Please click on the link
          that we have sent to you. If you have not received an email or want to
          resend the email, please click the button below.
        </Typography>
        <Box sx={{ alignItems: "center" }}>
          <Typography sx={{ fontSize: "12px", color: "primary.main" }}>
            {message === null ? "" : message}
          </Typography>
        </Box>
        <Button variant="contained" sx={{}} onClick={clickMe(email)}>
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
