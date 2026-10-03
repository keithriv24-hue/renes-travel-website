import React, { useEffect, useRef, useState } from "react";
import siteConfig from "../data/siteConfig";
import { tallyEnabled, buildInlineEmbedUrl, loadTallyScript, tallyFormUrl, redirectAfterTripSubmission } from "../lib/quote";
import { trackQuoteStart } from "../lib/analytics";

/**
 * The trip form, inline.
 * Tally on  → Tally iframe with Meta identifiers as query params (ported
 *             from Haul Yeah’s TallyInlineEmbed), dynamic height via embed.js.
 *             The iframe gets a plain src and NO data-tally-src: embed.js only
 *             auto-sizes iframes that have one or the other, never both. With
 *             both, the form was stuck at 560px and scrolled inside its box.
 * Tally off → René’s existing JotForm (Name, Email, Subject, Message), so
 *             nothing breaks while the Tally form is being set up.
 */
export default function QuoteEmbed() {
  const [tallyUrl, setTallyUrl] = useState(null);
  const iframeRef = useRef(null);
  const useTally = tallyEnabled();

  useEffect(() => {
    if (!useTally) return;
    let cancelled = false;
    buildInlineEmbedUrl("plan-page").then((url) => {
      if (cancelled) return;
      setTallyUrl(url);
      trackQuoteStart("plan-page-inline");
    });
    return () => { cancelled = true; };
  }, [useTally]);

  // Only a successful submission from this form's own iframe can redirect.
  useEffect(() => {
    if (!useTally) return;
    const onMessage = (event) => {
      if (event.origin !== "https://tally.so" || !iframeRef.current || event.source !== iframeRef.current.contentWindow) return;
      let data = event.data;
      if (typeof data === "string") {
        try { data = JSON.parse(data); } catch { return; }
      }
      if (data?.event === "Tally.FormSubmitted" && data.payload?.formId === siteConfig.tally.formId) {
        redirectAfterTripSubmission();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [useTally]);

  // Runs after the iframe is in the DOM, then lets embed.js auto-size it.
  useEffect(() => {
    if (!tallyUrl) return;
    let cancelled = false;
    loadTallyScript().then((ok) => {
      if (!cancelled && ok && window.Tally?.loadEmbeds) window.Tally.loadEmbeds();
    });
    return () => { cancelled = true; };
  }, [tallyUrl]);

  if (useTally) {
    return (
      <div>
        <div className="embed">
          {tallyUrl ? (
            <iframe ref={iframeRef} src={tallyUrl} loading="lazy" height="560" title="Plan my trip form, René’s Travel Agency" />
          ) : (
            <div style={{ minHeight: 560, display: "grid", placeItems: "center" }} className="muted">Loading the trip form…</div>
          )}
        </div>
        {/* The consent line lives inside the Tally form, right above Submit, so it is not repeated here. */}
        <p className="consent">
          Form not loading? <a className="inline-link" href={tallyFormUrl()} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>, or
          call {siteConfig.contact.phoneDisplay}.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="embed">
        <iframe src={siteConfig.jotform.url} height="760" loading="lazy" title="Contact form, René’s Travel Agency" />
      </div>
      <p className="consent">
        Form not loading? <a className="inline-link" href={siteConfig.jotform.url} target="_blank" rel="noopener noreferrer">Open it in a new tab</a>, or
        call {siteConfig.contact.phoneDisplay}.
      </p>
    </div>
  );
}
