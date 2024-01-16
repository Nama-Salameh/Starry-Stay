import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import { theme } from "./theme/Theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CssVarsProvider theme={theme}>
        <CssBaseline>
          <StyledEngineProvider injectFirst>
            <App />
          </StyledEngineProvider>
        </CssBaseline>
      </CssVarsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
