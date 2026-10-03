/*
 * tracking.js — Meta (Facebook) attribution identifiers, ported from Haul Yeah.
 * Captures fbclid / _fbp / _fbc so a submitted Tally form can be matched back
 * to a Meta ad click. Harmless when the pixel is off: values are simply empty.
 */
const FBCLID_STORAGE_KEY = "rta_fbclid";
const FBP_POLL_INTERVAL_MS = 100;
const FBP_POLL_TIMEOUT_MS = 2000;

function getCookie(name) {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"));
  return match ? decodeURIComponent(match[1]) : "";
}

export function readFbclid() {
  if (typeof window === "undefined") return "";
  const fromUrl = new URLSearchParams(window.location.search).get("fbclid") || "";
  if (fromUrl) {
    try { window.localStorage.setItem(FBCLID_STORAGE_KEY, fromUrl); } catch { /* storage blocked */ }
    return fromUrl;
  }
  try { return window.localStorage.getItem(FBCLID_STORAGE_KEY) || ""; } catch { return ""; }
}

function waitForFbpCookie() {
  return new Promise((resolve) => {
    const start = Date.now();
    const tick = () => {
      const fbp = getCookie("_fbp");
      if (fbp) return resolve(fbp);
      if (Date.now() - start >= FBP_POLL_TIMEOUT_MS) return resolve("");
      setTimeout(tick, FBP_POLL_INTERVAL_MS);
    };
    tick();
  });
}

let identifiersPromise = null;

export function primeMetaIdentifiers() {
  if (identifiersPromise) return identifiersPromise;
  identifiersPromise = (async () => {
    const fbclid = readFbclid();
    const fbp = await waitForFbpCookie();
    let fbc = getCookie("_fbc");
    if (!fbc && fbclid) fbc = `fb.1.${Date.now()}.${fbclid}`;
    return { fbclid, fbp, fbc, event_source_url: typeof window !== "undefined" ? window.location.href : "" };
  })();
  return identifiersPromise;
}

export const getMetaIdentifiers = () => primeMetaIdentifiers();

export function nonEmpty(obj) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== ""));
}
