import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
        h3: {
            fontWeight: 600,
            color: "#755CDE",
            fontSize:38
        },
        h2: {
            fontWeight: 600,
            fontSize:46
        }
    }
})

export default function ResetPassword() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
      <ThemeProvider theme={theme}>
        <Grid container component="main" sx={{ height: '100vh' }}>
            <CssBaseline />
            <Grid
            item
            xs={false}
            sm={4}
            md={6}
            sx={{
                bgcolor: '#755CDE',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
            />
            <Grid item xs={12} sm={8} md={6} elevation={6} square>

            <Box
                sx={{
                my: 20,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
            <Grid item>
                <Typography variant="h2" color="secondary">
                    Quests
                </Typography>
                <Typography variant="h2">
                    Reset your password
                </Typography>
            </Grid>
            <Box
                sx={{
                my: 3,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >

                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Reset Password
                </Button>

                    <Grid item alignContent="center">
                        Not yet registered?
                    <Link href="#" variant="body2">
                        {"Create an account."}
                    </Link>
                    </Grid>
                </Box>
                </Box>
            </Box>
            </Grid>
        </Grid>
      </ThemeProvider>
  );
}