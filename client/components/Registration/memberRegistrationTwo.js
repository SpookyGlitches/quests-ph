import * as React from 'react';
import { useState } from 'react';
import {
  Typography,
  TextField,
  Box,
  Stack,
  InputAdornment,
  IconButton,
  Link as MuiLink,
} from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const MemberRegistrationTwo = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <>
      <Stack direction="column" spacing={2}>
        <TextField
          fullWidth
          required
          style={{}}
          id="filled-required"
          label="Email Address"
          name="emailAddress"
          sx={{ mt: '1rem' }}
        />
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
          autoComplete="current-password"
          sx={{}}
        />
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
          autoComplete="current-password"
          sx={{}}
        />
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
