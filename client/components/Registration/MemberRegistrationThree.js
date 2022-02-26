import * as React from 'react';
import {
  Typography,
  TextField,
  Box,
  Stack,
  Link as MuiLink,
} from '@mui/material';
import Link from 'next/link';

const MemberRegistrationTwo = () => {
  return (
    <>
      <Stack direction="column" spacing={2}>
        <Typography variant="string" sx={{ mt: '2rem' }} textAlign="center">
          You have successfully created a new account.
        </Typography>
        <Typography
          variant="string"
          sx={{ mt: '1rem', mb: '1rem' }}
          textAlign="center"
        >
          {' '}
          <MuiLink
            sx={{ cursor: 'pointer' }}
            style={{ textDecoration: 'none' }}
          >
            <Link href="/">Home</Link>
          </MuiLink>
        </Typography>
      </Stack>
    </>
  );
};

export default MemberRegistrationTwo;
