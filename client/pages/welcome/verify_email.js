import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import WelcomeCarousel from '../../components/Welcome/WelcomeCarousel.js';

export default function VerifyEmail() {

  return (
    //   <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid item xs={false} sm={4}
            md={6}
            sx={{
                bgcolor: '#755CDE',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            >
            <WelcomeCarousel />
            </Grid>
            <Grid item xs={12} sm={8} md={6} elevation={6} square>

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
                    md: "7rem",
                },
                }}
                >
                    <Box>
                    <Typography
                        variant="h4"
                        sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "#755CDE",
                        }}
                    >
                        Quests
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                        textAlign: "left",
                        fontWeight: "bold",
                        color: "black",
                        }}
                    >
                        Reset your password.
                    </Typography>
                    <Typography
                        mt={2}
                        variant="h6"
                        sx={{
                        textAlign: "left",
                        fontWeight: "regular",
                        color: "black",
                        }}
                    >
                        We have sent an email to ninomaeianis@hololive.com.
                    </Typography>
                    <Typography
                        mt={4}
                        variant="h6"
                        sx={{
                        textAlign: "left",
                        fontWeight: "regular",
                        color: "black",
                        }}
                    >
                        You need to verify your email to continue. Please click on the
                        link that we have sent to you. If you have not received an 
                        email or want to resend the email, please click the button 
                        below.
                    </Typography>
                    </Box>

                    <Button variant="contained">Resend Verification Email</Button>
                </Box>
            </Grid>
        </Grid>
  );
}