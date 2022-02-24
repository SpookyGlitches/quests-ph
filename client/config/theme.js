import { createTheme } from "@mui/material/styles"

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
    MuiLink: {
      defaultProps: {
        underline: "hover",
        cursor: "pointer",
      },
    },
  },
  typography: {
		h4: {
			fontWeight: 700,
		},
	},
})

export default theme
