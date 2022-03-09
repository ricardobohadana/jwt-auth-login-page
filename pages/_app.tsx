import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globalStyle";
import { theme } from "../styles/theme";
import "../styles/globals.css";

export const API_URL = "http://localhost:3001";

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
