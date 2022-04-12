import { useState } from "react";
import { CssBaseline, Box, Toolbar, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";

const drawerWidth = 240;

const AppLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Navbar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        userRole={session?.user?.role}
      />
      <Box
        component="main"
        sx={{
          p: {
            sm: 2,
            md: 3,
          },
          flexGrow: 1,
        }}
      >
        <Toolbar />
        <Container
          sx={{
            width: {
              xs: "100%",
              md: "90%",
              lg: "80%",
            },
            marginTop: "0.5rem",
            marginBottom: "1rem",
          }}
          maxWidth="lg"
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default AppLayout;
