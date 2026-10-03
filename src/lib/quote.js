/*
 * quote.js — the "Plan my trip" form (Tally helpers ported from Haul Yeah).
 * ─────────────────────────────────────────────────────────────
 * While siteConfig.tally.formId is "", Tally is OFF: buttons link to
 * /plan-my-trip/, which embeds René's existing JotForm, so inquiries keep
 * arriving during the switch. Once the Tally form exists, set formId and:
 *   • every "Plan my trip" button opens the Tally popup, passing the Meta
 *     identifiers and the button's source as hidden fields,
 *   • /plan-my-trip/ shows the Tally form inline,
 *   • Tally redirects to /thank-you/, which fires the Lead event.
 * If the Tally script is blocked, buttons fall back to the plain form URL.
 * ─────────────────────────────────────────────────────────────
 */
import siteConfig from "../data/siteConfig";
import { getMetaIdentifiers, nonEmpty } from "./tracking";

export const tripThankYouPath = "/thank-you/";
export function redirectAfterTripSubmission() {
  if (typeof window !== "undefined") window.location.assign(tripThankYouPath);
}

export const tallyEnabled = () => Boolean(siteConfig.tally.formId);
export const tallyFormUrl = () => `https://tally.so/r/${siteConfig.tally.formId}`;
export const tallyEmbedBase = () =>
  `https://tally.so/embed/${siteConfig.tally.formId}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;

let scriptPromise = null;
export function loadTallyScript() {
  if (typeof window === "undefined" || !tallyEnabled()) return Promise.resolve(false);
  if (window.Tally) return Promise.resolve(true);
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise((resolve) => {
    const s = document.createElement("script");
    s.src = siteConfig.tally.scriptUrl;
    s.async = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
  return scriptPromise;
}

function appendParams(url, params) {
  const search = new URLSearchParams(params).toString();
  return search ? url + (url.includes("?") ? "&" : "?") + search : url;
}

export async function buildInlineEmbedUrl(source = "plan-page") {
  const ids = nonEmpty({ ...(await getMetaIdentifiers()), source });
  return appendParams(tallyEmbedBase(), ids);
}

export async function openTallyPopup(source = "button") {
  const ids = nonEmpty({ ...(await getMetaIdentifiers()), source });
  await loadTallyScript();
  if (window.Tally && typeof window.Tally.openPopup === "function") {
    window.Tally.openPopup(siteConfig.tally.formId, { layout: "modal", width: 700, hideTitle: true, hiddenFields: ids, onSubmit: redirectAfterTripSubmission });
    return;
  }
  window.open(appendParams(tallyFormUrl(), ids), "_blank", "noopener,noreferrer");
}
