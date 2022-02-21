import { useState } from "react";
import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import {
	List,
	ListItem,
	Divider,
	Drawer,
	CssBaseline,
	Box,
	ListItemIcon,
	ListItemText,
	Toolbar,
} from "@mui/material";

const drawerWidth = 240;

function Sidebar(props) {
	const { window } = props;
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	const renderIcon = (text) => {
		switch (text) {
			case "Home":
				return <HomeRoundedIcon />;
			case "Quests":
				return <MapRoundedIcon />;
			case "Articles":
				return <ArticleRoundedIcon />;
			case "Friends":
				return <PeopleRoundedIcon />;
			case "Chats":
				return <ChatRoundedIcon />;
			case "Log Out":
				return <LogoutRoundedIcon />;
			default:
				return <></>;
		}
	};

	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			{/* something app logo/profile should be here */}
			<List>
				{[
					// search, notifs, and profile i balhin nalang siguro sa app bar?
					"Home",
					"Quests",
					"Articles",
					"Friends",
					"Chats",
					"Log Out",
				].map((text, index) => (
					<Link
						href={`/${text.replace(/ /g, "").toLowerCase()}`}
						passHref
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
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			{/* i think ang below should be a different component */}
			{/* <AppBar
				position="fixed"
				sx={{
					width: { sm: `calc(100% - ${drawerWidth}px)` },
					ml: { sm: `${drawerWidth}px` },
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ mr: 2, display: { sm: "none" } }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Responsive drawer
					</Typography>
				</Toolbar>
			</AppBar> */}
			<Box
				component="nav"
				sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
						display: { xs: "block", sm: "none" },
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
						display: { xs: "none", sm: "block" },
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
		</Box>
	);
}

export default Sidebar;
