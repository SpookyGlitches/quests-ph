import Box from '@mui/material/Box';
import Link from 'next/link';
import Typography from '@mui/material/Typography';

function Copyright() {
  return (
    <Typography
      variant="body2"
      sx={{
        textAlign: 'left',
        color: 'primary.main',
      }}
    >
      {'Copyright © '}
      <Link href="/landing">Quests</Link> {new Date().getFullYear()}
    </Typography>
  );
}

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: 'auto',
        display: 'flex',
      }}
    >
      <Box maxWidth="sm" sx={{ ml: 8 }}>
        <Copyright />
      </Box>
      <Box maxWidth="sm" sx={{ ml: 75 }}>
        <Link href="/landing/privacy-policy">Privacy Policy</Link>
      </Box>
      <Box maxWidth="sm" sx={{ ml: 16 }}>
        <Link href="/landing/terms-of-service">Terms of Service</Link>
      </Box>
    </Box>
  );
};

export default Footer;
