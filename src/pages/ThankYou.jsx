import React, { useEffect, useRef } from "react";
import { Link } from "react-router";
import siteConfig from "../data/siteConfig";
import { trackLead } from "../lib/analytics";

/**
 * /thank-you/: the conversion page (Haul Yeah pattern). noindex, not in the
 * sitemap, but prerendered. The Lead event fires once per visit.
 * REQUIRED TALLY SETTING: Settings → After submission → Redirect to
 * https://renestravelagency.com/thank-you/ (see docs/TALLY_FORM_SETUP.md).
 */
export default function ThankYou() {
  const fired = useRef(false);
  useEffect(() => {
    if (fired.current) return;
    fired.current = true;
    trackLead();
  }, []);
  const { contact, contactNote } = siteConfig;
  return (
    <section className="section">
      <div className="wrap-narrow">
        <p className="label" style={{ color: "var(--color-blue)" }}>Request received</p>
        <h1 className="h-page" style={{ marginTop: 16 }}>Thank you. René has your trip request.</h1>
        <p className="lede" style={{ marginTop: 24 }}>
          René has your details and will get back to you about your trip. If it is urgent, call or text {contact.phoneDisplay}.
        </p>
        <p className="signature" aria-hidden="true">René</p>
        <p className="muted">{contactNote.signoff}</p>
        <div className="link-row" style={{ marginTop: 32 }}>
          <a className="btn" href={`tel:${contact.phoneTel}`}>Call {contact.phoneDisplay}</a>
          {contact.acceptsTexts ? <a className="btn btn-ghost" href={`sms:${contact.phoneTel}`}>Text René</a> : null}
          <Link className="tlink" to="/forms/">Client forms</Link>
        </div>
      </div>
    </section>
  );
}
