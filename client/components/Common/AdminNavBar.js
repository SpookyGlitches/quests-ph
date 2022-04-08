import { AppBar, Toolbar, IconButton, Typography, Menu } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useState } from "react";

const Navbar = ({ drawerWidth, handleDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    />
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          ml: { md: `${drawerWidth}px` },
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
        elevation={1}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: "none" } }}
          >
            <MenuRoundedIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            Quests Admin
          </Typography>
        </Toolbar>
      </AppBar>

      {renderMenu}
    </>
  );
};
export default Navbar;
