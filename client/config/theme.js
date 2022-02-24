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
    shape: {
      borderRadius: 10,
    },
  },
})

export default theme
