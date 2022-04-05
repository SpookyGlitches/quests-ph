import "../styles/globals.css";

import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { SWRConfig } from "swr";
import { ThemeProvider } from "@mui/material/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import theme from "../config/theme";
import { swrConfig } from "../config/swr";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SWRConfig value={swrConfig}>
          <SnackbarProvider maxSnack={3}>
            <SessionProvider session={session}>
              {getLayout(<Component {...pageProps} />)}
            </SessionProvider>
          </SnackbarProvider>
        </SWRConfig>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default MyApp;
