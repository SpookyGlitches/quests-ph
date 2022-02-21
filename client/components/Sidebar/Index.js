import Link from "next/link";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import MapRoundedIcon from "@mui/icons-material/MapRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";
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

const Sidebar = (props) => {
	const { window, drawerWidth, handleDrawerToggle, mobileOpen } = props;

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
				].map((text) => (
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
		<Box sx={{ display: "flex" }}>
			<CssBaseline />

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
};

export default Sidebar;
