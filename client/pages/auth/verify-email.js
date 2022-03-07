<<<<<<< HEAD
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import WelcomeCarousel from '../../components/Welcome/WelcomeCarousel.js';

export default function VerifyEmail() {
  return (
    <Grid
      container
      sx={{
        backgroundColor: 'background.paper',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        order={{ xs: 3, sm: 2 }}
        sx={{ height: '100%', backgroundColor: 'gray' }}
      >
        <WelcomeCarousel />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        order={{ xs: 2, sm: 3 }}
        sx={{ height: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            gap: 3,
            padding: {
              xs: '4rem',
              md: '7rem',
            },
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                textAlign: 'left',
                color: 'primary.main',
              }}
            >
              Quests
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textAlign: 'left',
                color: 'black',
              }}
            >
              Reset your password.
            </Typography>
            <Typography
              mt={2}
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'regular',
                color: 'black',
              }}
            >
              We have sent an email to ninomaeianis@hololive.com.
            </Typography>
            <Typography
              mt={4}
              variant="h6"
              sx={{
                textAlign: 'left',
                fontWeight: 'regular',
                color: 'black',
              }}
            >
              You need to verify your email to continue. Please click on the
              link that we have sent to you. If you have not received an email
              or want to resend the email, please click the button below.
            </Typography>
          </Box>

          <Button variant="contained">Resend Verification Email</Button>
        </Box>
      </Grid>
    </Grid>
=======
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AuthLayout from "../../components/Layouts/AuthLayout";
import AuthHeader from "../../components/Auth/AuthHeader";

export default function VerifyEmail() {
  return (
    <AuthLayout>
      <AuthHeader subtitle="Verify your email address" />
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
>>>>>>> af29c17a822af9223a0ac12dbd645e39d6b5d4e9
  );
}
