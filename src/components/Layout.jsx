import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTABar from "./MobileCTABar";
import useHead from "../lib/useHead";
import { loadAnalytics, trackContact, trackPageView, metaPageView } from "../lib/analytics";
import { primeMetaIdentifiers } from "../lib/tracking";
import { loadTallyScript } from "../lib/quote";

/**
 * Page shell (Haul Yeah pattern): header, main, footer, phone CTA bar.
 * Also: loads analytics only if configured, primes Meta identifiers, tracks
 * every tel:/sms:/mailto: click, fires page views per route, keeps <head>
 * in sync on navigation, and handles scroll position between pages.
 */
export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  const isFirst = first.current;

  useHead(pathname, isFirst);

  useEffect(() => {
    loadAnalytics();
    primeMetaIdentifiers();
    loadTallyScript();
    const onClick = (e) => {
      const a = e.target.closest?.("a");
      if (!a) return;
      const href = a.getAttribute("href") || "";
      if (href.startsWith("tel:")) trackContact("phone", href);
      else if (href.startsWith("sms:")) trackContact("sms", href);
      else if (href.startsWith("mailto:")) trackContact("email", href);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    const firstNav = first.current;
    first.current = false;
    trackPageView(pathname);
    if (!firstNav) metaPageView();
    if (firstNav) return;
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) { el.scrollIntoView(); return; }
    }
    window.scrollTo(0, 0);
    document.getElementById("main")?.focus({ preventScroll: true });
  }, [pathname, hash]);

  return (
    <div className="page-body">
      <a className="skip" href="#main">Skip to content</a>
      <Header />
      <main id="main" tabIndex={-1} style={{ outline: "none" }}>{children}</main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}
