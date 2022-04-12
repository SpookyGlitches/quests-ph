import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import ConnectWithoutContactRoundedIcon from "@mui/icons-material/ConnectWithoutContactRounded";

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

const mentorSidebar = [
  "Home",
  "Quests",
  "Requests",
  "Articles",
  "Friends",
  "Chats",
];
const memberSidebar = ["Home", "Quests", "Articles", "Friends", "Chats"];
const Sidebar = (props) => {
  const { window, drawerWidth, handleDrawerToggle, mobileOpen, role } = props;
  // eslint-disable-next-line consistent-return
  const renderIcon = (text) => {
    switch (text) {
      case "Home":
        return <HomeRoundedIcon />;
      case "Quests":
        return <MapRoundedIcon />;
      case "Requests":
        return <ConnectWithoutContactRoundedIcon />;
      case "Articles":
        return <ArticleRoundedIcon />;
      case "Friends":
        return <PeopleRoundedIcon />;
      case "Chats":
        return <ChatRoundedIcon />;
      case "Profile":
        return <AccountCircleRoundedIcon />;
      default:
    }
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      {/* something app logo/profile should be here */}
      <List>
        {role === "mentor"
          ? mentorSidebar.map((text) => (
              <Link
                href={`/${text.replace(/ /g, "").toLowerCase()}`}
                passHref
                key={text}
              >
                <ListItem button key={text} component="a">
                  <ListItemIcon>{renderIcon(text)}</ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))
          : memberSidebar.map((text) => (
              <Link
                href={`/${text.replace(/ /g, "").toLowerCase()}`}
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
