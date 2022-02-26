import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

const Header = () => {
    return (
        <Box
        component="header"
        sx={{
          py: 2,
          px: 2,
          display: "flex",
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
        >
            <Box 
                maxWidth="sm"
                sx={{ ml: 10}} 
            >
                <Link color="inherit" href="/landing">
                    <Typography
                        variant="h5"
                        sx={{
                        fontWeight: "bold",
                        color: "#755CDE",
                        }}
                    >
                        Quests
                    </Typography>
                </Link>
            </Box>
            <Box 
                maxWidth="sm" 
                sx={{ mr: 10 }}
            >
                <Link color="inherit" href="/login">
                    <Typography
                        variant="h6"
                    >
                        Login
                    </Typography>
                </Link>
            </Box>
      </Box>
    );
}

export default Header