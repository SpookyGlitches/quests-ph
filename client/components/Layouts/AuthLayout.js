import { Grid, Box } from "@mui/material";
import AuthCarousel from "../Auth/AuthCarousel";

const AuthLayout = ({ children }) => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        order={{ xs: 3, sm: 2 }}
        sx={{ height: "100%", backgroundColor: "primary.main" }}
      >
        <AuthCarousel />
      </Grid>
      <Grid
        item
        xs={12}
        sm={6}
        order={{ xs: 2, sm: 3 }}
        sx={{ height: "100%" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            gap: 3,
            padding: {
              xs: "4rem",
              md: "7rem",
            },
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};
export default AuthLayout;
