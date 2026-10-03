import React, { useEffect, useState } from "react";
import siteConfig from "../data/siteConfig";
import { tallyEnabled, buildInlineEmbedUrl, loadTallyScript, tallyFormUrl } from "../lib/quote";
import { trackQuoteStart } from "../lib/analytics";

/**
 * The trip form, inline.
 * Tally on  → Tally iframe with Meta identifiers as query params (ported
 *             from Haul Yeah’s TallyInlineEmbed), dynamic height via embed.js.
 * Tally off → René’s existing JotForm (Name, Email, Subject, Message), so
 *             nothing breaks while the Tally form is being set up.
 */
export default function QuoteEmbed() {
  const [tallyUrl, setTallyUrl] = useState(null);
  const useTally = tallyEnabled();

  useEffect(() => {
    if (!useTally) return;
    let cancelled = false;
    const ready = loadTallyScript();
    buildInlineEmbedUrl("plan-page").then((url) => {
      if (cancelled) return;
      setTallyUrl(url);
      trackQuoteStart("plan-page-inline");
      ready.then(() => setTimeout(() => { if (!cancelled && window.Tally?.loadEmbeds) window.Tally.loadEmbeds(); }, 0));
    });
    return () => { cancelled = true; };
  }, [useTally]);

  if (useTally) {
    return (
      <div>
        <div className="embed">
          {tallyUrl ? (
            <iframe data-tally-src={tallyUrl} src={tallyUrl} loading="lazy" height="560" title="Plan my trip form, René’s Travel Agency" />
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
