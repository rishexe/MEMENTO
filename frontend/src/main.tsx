import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { VisitProvider } from "./VisitContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <VisitProvider>
        <App />
      </VisitProvider>
    </BrowserRouter>
  </StrictMode>
);