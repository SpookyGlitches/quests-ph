import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#755cde",
			contrastText: "#ffffff",
		},
		text: {
			primary: "#000000",
		},
		background: {
			default: "#f5f5f5",
		},
	},

	components: {
		MuiTextField: {
			defaultProps: {
				variant: "filled",
			},
		},
	},
	typography: {
		h4: {
			fontWeight: 700,
		},
		button: {
			textTransform: "none",
		},
	},
});

export default theme;
