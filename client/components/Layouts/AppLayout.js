import { useState } from "react";
import { CssBaseline, Box, Toolbar, Container } from "@mui/material";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import { useRouter } from "next/router";
import Navbar from "../Common/Navbar";
import Sidebar from "../Common/Sidebar";
import Banned from "../Error/Banned";
import DocumentTitle from "../Common/DocumentTitle";

const drawerWidth = 240;

const AppLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { data: myInfo } = useSWR("/profile/friends/friendinfo");
  if (!myInfo)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    );
  if (myInfo.isBanned === false) {
    return (
      <Box sx={{ display: "flex" }}>
        <DocumentTitle title={capitalize(router.pathname.split("/")[1])} />
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
  }
  return <Banned />;
};

export default AppLayout;
