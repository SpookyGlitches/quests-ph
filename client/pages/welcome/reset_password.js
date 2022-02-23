import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link as MuiLink } from '@mui/material';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Carousel from 'react-material-ui-carousel';

export default function ResetPassword() {
  
    const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
    });
  };

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
            <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            sx={{
                height: "100%",
                width: "100%",
                backgroundColor: "#755CDE",
            }}
            >
            <img
                style={{ width: "auto", height: "auto%" }}
                alt="Quests"
                src="/assets/resetpassword/carousel1.png"
            />

            <img
                style={{ width: "auto", height: "auto" }}
                alt="Quests"
                src="/assets/resetpassword/carousel2.png"
            />

            <img
                style={{ width: "auto", height: "auto" }}
                alt="Quests"
                src="/assets/resetpassword/carousel3.png"
            />
            </Carousel>
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
                    </Box>
                    <Stack direction="column" spacing={2}>
                    <TextField
                        fullWidth
                        required
                        style={{}}
                        id="filled-required"
                        label="Email Address"
                        sx={{}}
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
                        <Typography variant="string">
                        Not yet registered?{" "}
                        <Link href="/">
                            <MuiLink sx={{ cursor: "pointer" }}>Create an account</MuiLink>
                        </Link>
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
  );
}