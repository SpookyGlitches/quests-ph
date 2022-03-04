import Box from '@mui/material/Box';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

const Header = () => {
  return (
    <Box
      component="header"
      sx={{
        py: 2,
        px: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Box maxWidth="sm" sx={{ ml: 10 }}>
        <Typography
          variant="h5"
          sx={{
            color: 'primary.main',
          }}
        >
          <Link href="/landing">Quests</Link>
        </Typography>
      </Box>
      <Box maxWidth="sm" sx={{ mr: 10 }}>
        <Typography variant="h6">
          <Link color="inherit" href="auth/login">
            Login
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Header;
