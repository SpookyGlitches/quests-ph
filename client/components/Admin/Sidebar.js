import { List, Divider, Drawer, Box, Toolbar } from "@mui/material";
import { useRouter } from "next/router";
import SidebarLinkMenu from "../Common/SidebarLinkMenu";

const Sidebar = (props) => {
  const { window, drawerWidth, handleDrawerToggle, mobileOpen } = props;
  const router = useRouter();

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          // Mapping of different admin placeholders
          "Users",
          "Applications",
          "Articles",
          "Quests",
          "Reports",
        ].map((text) => {
          const href = `/admin/${text.replace(/ /g, "").toLowerCase()}`;
          return (
            <SidebarLinkMenu
              path={href}
              key={text}
              routerPathName={router.pathname}
              label={text}
            />
          );
        })}
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
