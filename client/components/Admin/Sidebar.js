import Link from "next/link";
import AssignmentRoundedIcon from "@mui/icons-material/AssignmentRounded";
import InsertDriveFileRoundedIcon from "@mui/icons-material/InsertDriveFileRounded";
import KeyboardTabRoundedIcon from "@mui/icons-material/KeyboardTabRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import {
  List,
  ListItem,
  Divider,
  Drawer,
  Box,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

const Sidebar = (props) => {
  const { window, drawerWidth, handleDrawerToggle, mobileOpen } = props;

  // eslint-disable-next-line consistent-return
  const renderIcon = (text) => {
    switch (text) {
      case "Users":
        return <PersonRoundedIcon />;
      case "Applications":
        return <InsertDriveFileRoundedIcon />;
      case "Articles":
        return <AssignmentRoundedIcon />;
      case "Quests":
        return <MapRoundedIcon />;
      case "Reports":
        return <WarningRoundedIcon />;
      case "Logout":
        return <KeyboardTabRoundedIcon />;
      default:
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/* something app logo/profile should be here */}
      <List>
        {[
          // Mapping of different admin placeholders
          "Users",
          "Applications",
          "Articles",
          "Quests",
          "Reports",
          "Logout",
        ].map((text) => (
          <Link
            href={`/admin/${text.replace(/ /g, "").toLowerCase()}`}
            passHref
            key={text}
          >
            <ListItem button key={text} component="a">
              <ListItemIcon>{renderIcon(text)}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          </Link>
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
