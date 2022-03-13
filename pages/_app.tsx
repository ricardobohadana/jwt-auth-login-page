import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../styles/globalStyle";
import { theme } from "../styles/theme";
import "../styles/globals.css";

// DEV
// export const API_URL = "http://localhost:3001";
// PROD
export const API_URL = "https://jwt-auth-express-ts.herokuapp.com";

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
