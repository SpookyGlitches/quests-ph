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

import useForm from '../../hooks/useForm';
import Header from './Header';

const MemberRegistrationOne = ({activeStep, steps, handleNext}) => {
  const [value, setValue] = React.useState(null);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const color = '#858393';

  const stateSchema = {
    displayName: {value: "", error: ""},
    fullName: {value: "", error: ""},
  };

  const stateValidatorSchema = {
    displayName: {
      required: true,
      validator: {
        func: (value) => /^[[A-Za-z][A-Za-z0-9_]{7,29}$/.test(value),
        error: 'Display Name must be 8-30 characters',
      }
    },
    fullName: {
      required: true,
      validator: {
        func: (value) => /^[[A-Za-z][A-Za-z0-9_]{7,29}$/.test(value),
        error: 'Full Name must be 8-30 characters',
      }
    }
    
  }
  
  const { values, errors, dirty, handleOnChange } = useForm(
    stateSchema,
    stateValidatorSchema,
  );
  const { displayName, fullName } = values;

  
  return (
    <>
    <Header />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="column" spacing={1.5}>
          <Button
            style={{
              borderRadius: 10,
              minheight: '56px',
              width: '100%',
              backgroundColor: 'white',
              color: 'black',
              marginTop: '1rem'
            }}
            variant="contained"
          >
            <img src="/assets/google.png" width="15" height="15"  /> &nbsp; Sign
            Up with Google
          </Button>
          <Typography align="center">or</Typography>
          <TextField
            fullWidth
            required
            style={{}}
            id="filled-required"
            label="Display Name"
            name="displayName"
            value={displayName}
            onChange={handleOnChange}
          />
          {errors.displayName && dirty.displayName && (
            <Typography
              style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
            >
              {errors.displayName}
            </Typography>,
          )}
          <TextField
            fullWidth
            required
            style={{}}
            id="filled-required"
            label="Full Name"
            name="fullName"
            value={fullName}
            onChange={handleOnChange}
            sx={{}}
          />
          {errors.fullName && dirty.fullName && (
              <Typography
                style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
              >
                {errors.fullName}
              </Typography>,
            )}

          <DatePicker
            label="Birthday"
            value={value}
            name="birthdate"
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
          
          { !displayName ||
            !fullName
            ?
            (
              <Button variant="contained" disabled>
                {activeStep === steps.length ? 'Finish' : 'Next'}
                
                </Button>
            ) :
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length ? 'Finish' : 'Next'}
              </Button>
          }
          
        </Stack>

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
