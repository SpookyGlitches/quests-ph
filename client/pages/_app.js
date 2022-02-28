import "../styles/globals.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../config/theme";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={DateAdapter}>
        <Component {...pageProps} />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
