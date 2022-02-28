import * as React from 'react';
import { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  Button,
  Stack,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import useForm from '../../hooks/useForm';
import Header from './Header';

const MemberRegistrationTwo = ({activeStep, steps, handleNext, handleBack}) => {

  
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  

    const stateSchema = {
      emailAddress: {value: "", error: ""},
      password: {value: "", error: ""},
      confirmPassword: {value: "", error: ""},
    };
  
    const stateValidatorSchema = {
      emailAddress: {
        required: true,
        validator: {
          func: (value) => /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value),
          error: 'Email must be a valid email address',
        }
      },
      password: {
        required: true,
        validator: {
          func: (value) => /^(?=.*[A-Za-z])(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(value),
          error: 'Password must be at least 8 characters and at least one special character',
        }
      }
      
    }
    
    const { values, errors, dirty, handleOnChange } = useForm(
      stateSchema,
      stateValidatorSchema,
    );
    const { emailAddress, password, confirmPassword } = values;


  return (
    <>
    <Header />
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          required
          style={{}}
          id="filled-required"
          label="Email Address"
          name="emailAddress"
          value={emailAddress}
          onChange={handleOnChange}
          sx={{ mt: '1rem' }}
        />
        {errors.emailAddress && dirty.emailAddress && (
            <Typography
              style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
            >
              {errors.emailAddress}
            </Typography>,
          )}
        <TextField
          fullWidth
          id="filled-password-input"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          name="password"
          value={password}
          onChange={handleOnChange}
          autoComplete="current-password"
          sx={{}}
        />
        {errors.password && dirty.password && (
            <Typography
              style={{ marginTop: '0', color: 'red', fontWeight: '200' }}
            >
              {errors.password}
            </Typography>,
          )}
        <TextField
          fullWidth
          id="filled-password-input"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleOnChange}
          autoComplete="current-password"
          sx={{}}
        />
        {confirmPassword != password ? (
          <Typography style={{color: "red"}}>Passwords do not match!</Typography>
        ) : null }
        <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
        { !emailAddress ||
            !password ||
            !confirmPassword || confirmPassword != password
            ?
            (
              <Button variant="contained" disabled>
                {activeStep === steps.length ? 'Finish' : 'Sign Up'}
                
                </Button>
            ) :
            <Button variant="contained" onClick={handleNext}>
              {activeStep === steps.length ? 'Finish' : 'Sign Up'}
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
        <Typography
          variant="string"
          sx={{ mt: '1rem', mb: '1rem' }}
          textAlign="center"
        >
          By signing up, I accept the{' '}
          <MuiLink
            sx={{ cursor: 'pointer' }}
            style={{ textDecoration: 'none' }}
          >
            <a href="/quests-terms">Quests Terms of Service</a>
          </MuiLink>{' '}
          and acknowledge the{' '}
          <MuiLink
            sx={{ cursor: 'pointer' }}
            style={{ textDecoration: 'none' }}
          >
            <a href="/privacy-policy">Privacy Policy</a>
          </MuiLink>
          .
        </Typography>
      </Box>
    </>
  );
};

export default MemberRegistrationTwo;
