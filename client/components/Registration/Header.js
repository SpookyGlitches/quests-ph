import { Typography, Box } from "@mui/material"

const Header = () => {
  return (
    <>
      <Box>
        <Typography
          variant="h4"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            color: "#755CDE",
            // mt: "-1rem",
          }}
        >
          Quests
        </Typography>
        <Typography
          variant="h5"
          sx={{
            textAlign: "left",
            fontWeight: "bold",
            color: "black",
            // mb: "-2.5rem",
          }}
        >
          Create an account.
        </Typography>
      </Box>
    </>
  )
}

export default Header
