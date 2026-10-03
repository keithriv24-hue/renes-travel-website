/*
 * analytics.js — the single conversion-event layer (ported from Haul Yeah).
 * ─────────────────────────────────────────────────────────────
 * Every conversion action routes through here and fans out to Meta and GA4.
 * Both are OFF until their IDs exist in siteConfig.analytics. With empty IDs
 * nothing loads, no requests fire, and every call below is a silent no-op.
 *
 * EVENT MAP
 *   trackQuoteStart(source) → Meta 'InitiateCheckout' | GA4 'quote_start'
 *       Quote form opened. Micro-conversion: do not optimise ads on it.
 *   trackLead()             → Meta 'Lead'             | GA4 'generate_lead'
 *       Fired once on /thank-you/ after the Tally form redirects there.
 *       THIS is the event ad campaigns should optimise for.
 *   trackContact(kind)      → Meta 'Contact'          | GA4 'phone_click' / 'sms_click' / 'email_click'
 *       Any tel:, sms: or mailto: click. A call is a lead for a travel agent.
 *
 * Every Meta event carries an eventID so a future Conversions API setup can
 * dedupe browser and server copies.
 * ─────────────────────────────────────────────────────────────
 */
import siteConfig from "../data/siteConfig";

const isBrowser = () => typeof window !== "undefined";
const hasFbq = () => isBrowser() && typeof window.fbq === "function" && Boolean(siteConfig.analytics.metaPixelId);
const hasGtag = () => isBrowser() && typeof window.gtag === "function" && Boolean(siteConfig.analytics.measurementId);

function newEventId(prefix) {
  return `${prefix}.${Date.now()}.${Math.random().toString(36).slice(2, 10)}`;
}

export function trackEvent(name, params = {}) {
  if (!hasGtag()) return;
  try { window.gtag("event", name, params); } catch { /* never throw */ }
}

function metaTrack(name, params = {}, eventId) {
  if (!hasFbq()) return;
  try { window.fbq("track", name, params, eventId ? { eventID: eventId } : undefined); } catch { /* never throw */ }
}

export function trackQuoteStart(source = "unknown") {
  metaTrack("InitiateCheckout", { content_name: "trip_form", content_category: source }, newEventId("quotestart"));
  trackEvent("quote_start", { source });
}

export function trackLead(params = {}) {
  const eventId = newEventId("lead");
  metaTrack("Lead", { content_name: "trip_request", ...params }, eventId);
  trackEvent("generate_lead", { ...params });
  return eventId;
}

/** @param {"phone"|"sms"|"email"} kind */
export function trackContact(kind, href = "") {
  metaTrack("Contact", { content_name: `${kind}_click` }, newEventId(`contact.${kind}`));
  trackEvent(`${kind}_click`, { href });
}

export function trackPageView(path) {
  trackEvent("page_view", { page_path: path, page_location: isBrowser() ? window.location.href : undefined });
}

/**
 * Inject GA4 and the Meta Pixel once, only when their IDs are set.
 * The gtag shim is defined BEFORE the DOM guard on purpose (Haul Yeah shipped
 * a bug where a prerendered loader tag made the guard skip the shim).
 */
export function loadAnalytics() {
  if (!isBrowser()) return;
  const { measurementId, metaPixelId } = siteConfig.analytics;

  if (measurementId) {
    window.dataLayer = window.dataLayer || [];
    if (typeof window.gtag !== "function") {
      window.gtag = function gtag() { window.dataLayer.push(arguments); };
      window.gtag("js", new Date());
      window.gtag("config", measurementId, { send_page_view: false });
    }
    if (!document.getElementById("ga4-loader")) {
      const s = document.createElement("script");
      s.id = "ga4-loader";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(s);
    }
  }

  if (metaPixelId && typeof window.fbq !== "function") {
    /* Standard Meta Pixel base code */
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", metaPixelId);
  }
}

/** Meta PageView for every route (the pixel has no automatic SPA tracking). */
export function metaPageView() {
  if (hasFbq()) { try { window.fbq("track", "PageView"); } catch { /* never throw */ } }
}
