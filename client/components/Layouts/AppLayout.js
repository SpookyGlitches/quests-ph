import { useState } from "react";
import { CssBaseline, Box, Toolbar } from "@mui/material";
import Navbar from "../Navbar/Index";
import Sidebar from "../Sidebar/Index";
const drawerWidth = 240;

const AppLayout = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);

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
			/>
			<Box component="main" sx={{ flexGrow: 1, p: 3 }}>
				<Toolbar />
				{children}
			</Box>
		</Box>
	);
};

export default AppLayout;
