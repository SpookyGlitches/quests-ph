import { List, Divider, Drawer, Box, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import SidebarLinkMenu from "./SidebarLinkMenu";

const memberlinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Quests",
    path: "/quests",
  },
  {
    label: "Articles",
    path: "/articles",
  },
  {
    label: "Friends",
    path: "/friends",
  },
  {
    label: "Chats",
    path: "/chats",
  },
  {
    label: "Badges",
    path: "/badges",
  },
];

const mentorLinks = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "Quests",
    path: "/quests",
  },
  {
    label: "Requests",
    path: "/requests",
  },
  {
    label: "Articles",
    path: "/articles",
  },
  {
    label: "Friends",
    path: "/friends",
  },
  {
    label: "Chats",
    path: "/chats",
  },
  {
    label: "Badges",
    path: "/badges",
  },
];

const Sidebar = (props) => {
  const router = useRouter();

  const { window, drawerWidth, handleDrawerToggle, mobileOpen, userRole } =
    props;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/* something app logo/profile should be here */}
      <List>
        {userRole === "mentor"
          ? mentorLinks.map(({ path, label }) => (
              <SidebarLinkMenu
                path={path}
                label={label}
                key={label}
                routerPathName={router.pathname}
              />
            ))
          : memberlinks.map(({ path, label }) => (
              <SidebarLinkMenu
                path={path}
                label={label}
                key={label}
                routerPathName={router.pathname}
              />
            ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
