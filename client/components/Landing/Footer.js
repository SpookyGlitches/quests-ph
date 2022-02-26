import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
    return (
      <Typography variant="body2" sx={{
          textAlign: "left",
          fontWeight: "bold",
          color: "#755CDE",
          }}>
        {'Copyright © '}
        <Link color="inherit" href="/landing">
          Quests
        </Link>{' '}
        {new Date().getFullYear()}
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
          display: "flex"
        }}
      >
        <Box 
            maxWidth="sm" 
            sx={{ ml: 8}} 
        >
          <Copyright />
        </Box>
        <Box 
            maxWidth="sm" 
            sx={{ ml: 85}}
        >
            <Link color="inherit" href="/landing/privacy_policy">
                Privacy Policy
            </Link>
        </Box>
        <Box 
            maxWidth="sm" 
            sx={{ ml: 16}}
        >
            <Link color="inherit" href="/landing/terms_of_service">
                Terms of Service
            </Link>
        </Box>
      </Box>
    );
}

export default Footer