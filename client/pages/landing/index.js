import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Footer from '../../components/Landing/Footer';
import Header from '../../components/Landing/Header';
import Button from '@mui/material/Button';
import Image from 'next/image';

export default function Index() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header />
      <CssBaseline />
      <Box
        sx={{
          mt: 5,
          ml: 21,
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Container component="main" maxWidth="sm">
          <Typography
            variant="h3"
            sx={{
              textAlign: 'left',
              mt: 3,
              justifyContent: 'flex-center',
            }}
          >
            We help individuals achieve their goals.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'left',
              mt: 5,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur abdipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Typography>
          <Box
            sx={{
              mt: 5,
              mb: 3,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
            }}
          >
            <Button variant="contained">
              <Link color="inherit" href="/landing/terms-of-service">
                Be a Mentor
              </Link>
            </Button>
            <Button variant="contained" sx={{ ml: 3 }}>
              <Link color="inherit" href="/landing/privacy-policy">
                Be a Mentee
              </Link>
            </Button>
          </Box>
        </Container>
        <Container component="main" sx={{ mt: 3 }} maxWidth="sm">
          <Image
            src="/assets/landing/LandingImage.png"
            alt="Landing Image"
            width={400}
            height={300}
          ></Image>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
}
