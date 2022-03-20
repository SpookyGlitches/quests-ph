import "../styles/globals.css";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { SessionProvider } from "next-auth/react";
import { SWRConfig } from "swr";
import axios from "axios";
import theme from "../config/theme";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SWRConfig
          value={{ fetcher: (url) => axios.get(url).then((res) => res.data) }}
        >
          <SessionProvider session={session}>
            <Component {...pageProps} />
          </SessionProvider>
        </SWRConfig>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
