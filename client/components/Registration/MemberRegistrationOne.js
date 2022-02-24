import * as React from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';
import DatePicker from '@mui/lab/DatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const MemberRegistrationOne = () => {
  const [value, setValue] = React.useState(null);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const color = '#858393';
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="column" spacing={2}>
          <Button
            style={{
              borderRadius: 10,
              minheight: '56px',
              width: '100%',
              backgroundColor: 'white',
              color: 'black',
            }}
            variant="contained"
          >
            <img src="/assets/google.png" width="15" height="15" /> &nbsp; Sign
            Up with Google
          </Button>
          <Typography align="center">or</Typography>
          <TextField
            fullWidth
            required
            style={{}}
            id="filled-required"
            label="Display Name"
            sx={{}}
          />
          <TextField
            fullWidth
            required
            style={{}}
            id="filled-required"
            label="Full Name"
            sx={{}}
          />

          <DatePicker
            label="Birthday"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  svg: { color },
                  input: { color },
                  backgroundColor: 'white',
                  borderColor: 'white',
                  mt: '1rem',
                  ml: '-1em',
                  width: '100%',
                }}
              />
            )}
          />
        </Stack>
        {/* <Button variant="contained" sx={{ mt: '1rem', mb: '1rem' }}>
          Next
        </Button> */}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography variant="string" sx={{ mt: '1rem', mb: '1rem' }}>
            <Link href="/login">
              <MuiLink
                sx={{ cursor: 'pointer' }}
                style={{ textDecoration: 'none' }}
              >
                Already have an account?
              </MuiLink>
            </Link>
          </Typography>
        </Box>
      </LocalizationProvider>
    </>
  );
};

export default MemberRegistrationOne;
