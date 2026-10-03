/*
 * Keeps <head> in sync on client-side navigation. The prerender script
 * writes the same tags into each page's static HTML (scripts/prerender.mjs),
 * both from the route table in ./routes.js, so crawlers and visitors see
 * identical titles, descriptions, canonicals and structured data.
 */
import { useEffect } from "react";
import { metaForPath } from "./routes";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) { if (el) el.remove(); return; }
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, key); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

export function applyHead(meta) {
  document.title = meta.title;
  setMeta("name", "description", meta.description);
  setMeta("name", "robots", meta.robots || "");
  setMeta("property", "og:title", meta.title);
  setMeta("property", "og:description", meta.description);
  setMeta("property", "og:url", meta.canonical);
  setMeta("property", "og:type", meta.ogType || "website");
  setMeta("property", "og:image", meta.ogImage || "");
  let link = document.head.querySelector('link[rel="canonical"]');
  if (meta.canonical) {
    if (!link) { link = document.createElement("link"); link.rel = "canonical"; document.head.appendChild(link); }
    link.href = meta.canonical;
  } else if (link) link.remove();
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((s) => s.remove());
  (meta.jsonLd || []).forEach((obj) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.textContent = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

export default function useHead(pathname, isFirst) {
  useEffect(() => {
    if (isFirst) return; // the prerendered HTML already carries the right head
    applyHead(metaForPath(pathname));
  }, [pathname, isFirst]);
}
