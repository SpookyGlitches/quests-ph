import * as React from 'react';
import { Grid, Box, Typography, Link as MuiLink } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import RegistrationForm from '../../components/Registration/RegistrationForm';

export default function Register() {
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
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          sx={{
            height: '100%',
            width: '100%',
            backgroundColor: '#755CDE',
          }}
        >
          <img
            style={{ width: 'auto', height: 'auto%' }}
            alt="Quests"
            src="/assets/loginregister/carousel1.png"
          />

          <img
            style={{ width: 'auto', height: 'auto' }}
            alt="Quests"
            src="/assets/loginregister/carousel2.png"
          />

          <img
            style={{ width: 'auto', height: 'auto' }}
            alt="Quests"
            src="/assets/loginregister/carousel3.png"
          />
        </Carousel>
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
            justifyContent: 'center',
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            gap: 3,
            padding: {
              xs: '2rem',
              md: '5rem',
            },
          }}
        >
          <RegistrationForm />
        </Box>
      </Grid>
    </Grid>
  );
}
