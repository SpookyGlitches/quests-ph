import { useState } from "react";
import { CssBaseline, Box, Toolbar, Container } from "@mui/material";
import Sidebar from "../Admin/Sidebar";
import AdminNavBar from "../Common/AdminNavBar";

const drawerWidth = 240;

const AdminLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AdminNavBar
        drawerWidth={drawerWidth}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Sidebar
        drawerWidth={drawerWidth}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
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

export default AdminLayout;
