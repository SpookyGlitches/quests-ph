import { Typography, Box } from '@mui/material';

const Header = () => {
  return (
    <>
      <Box sx={{}}>
        <Typography
          variant="h4"
          sx={{
            textAlign: 'left',
            fontWeight: 'bold',
            color: '#755CDE',
            mt: '2rem',
          }}
        >
          Quests
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: 'left',
            fontWeight: 'bold',
            color: 'black',
          }}
        >
          Create an account.
        </Typography>
      </Box>
    </>
  );
};

export default Header;
