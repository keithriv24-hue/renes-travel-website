import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";
import { buildRoutes, metaForPath, notFoundMeta, legacyRedirects } from "./lib/routes";
import siteConfig from "./data/siteConfig";

export function render(url) {
  return renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </React.StrictMode>,
  );
}

export { buildRoutes, metaForPath, notFoundMeta, legacyRedirects, siteConfig };
