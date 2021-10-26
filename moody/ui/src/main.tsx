import React from "react";
import ReactDOM from "react-dom";
import emotionReset from "emotion-reset";
import { Global, css } from "@emotion/react";
import AdapterLuxon from "@mui/lab/AdapterLuxon";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "rendition";
import { LocalizationProvider } from "@mui/lab";
import App from "./App";

import "./assets/fonts/index.css";

const globalStyles = css`
  ${emotionReset}
  *, *::after, *::before {
    box-sizing: border-box;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    font-smoothing: antialiased;
  }
  * {
    font-family: Montserrat !important;
  }
`;

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <Provider>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <QueryClientProvider client={queryClient}>
          <Global styles={globalStyles} />
          <App />
        </QueryClientProvider>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
