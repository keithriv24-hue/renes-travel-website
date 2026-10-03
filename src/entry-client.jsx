import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "@fontsource-variable/bodoni-moda/opsz.css";
import "@fontsource-variable/bodoni-moda/opsz-italic.css";
import "@fontsource-variable/libre-franklin/index.css";
import "@fontsource-variable/libre-franklin/wght-italic.css";
import "@fontsource/mrs-saint-delafield/latin-400.css";
import "./index.css";
import App from "./App";

const container = document.getElementById("root");
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Prerendered pages hydrate; the dev server (empty #root) renders fresh.
if (container.firstElementChild) hydrateRoot(container, app);
else createRoot(container).render(app);
