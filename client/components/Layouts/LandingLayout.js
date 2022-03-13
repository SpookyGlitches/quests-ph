import { Box, CssBaseline } from "@mui/material";
import Footer from "../Landing/Footer";
import Header from "../Landing/Header";

const LandingLayout = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        paddingX: [2, 4, 6, 8],
        paddingY: [2, null, null, 4],
      }}
    >
      <CssBaseline />
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          marginY: {
            xs: 6,
            lg: 0,
          },
        }}
        component="main"
      >
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default LandingLayout;
