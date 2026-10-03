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
    <section className="page-head thank-you">
      <div className="wrap-narrow">
        <p className="label" style={{ color: "var(--color-blue)" }}>Request received</p>
        <h1 className="h-page" style={{ marginTop: 16 }}>Your next adventure starts here.</h1>
        <p className="lede" style={{ marginTop: 24 }}>
          Thank you for sharing your travel plans. Your request has been submitted, and René will get back to you using the contact details you provided.
        </p>
        <div className="thank-you-next" style={{ marginTop: 32 }}>
          <h2 className="h-card">What happens next?</h2>
          <p style={{ marginTop: 12 }}>René will review your destination, dates and budget, then help you explore options for your trip. Your inquiry starts the planning process; it does not confirm a booking.</p>
          <p style={{ marginTop: 12 }}>Need to add a detail or speak with René sooner? Call or text {contact.phoneDisplay}.</p>
        </div>
        <p className="signature" aria-hidden="true">René</p>
        <p className="muted">{contactNote.signoff}</p>
        <div className="link-row" style={{ marginTop: 32 }}>
          <a className="btn" href={`tel:${contact.phoneTel}`}>Call {contact.phoneDisplay}</a>
          {contact.acceptsTexts ? <a className="btn btn-ghost" href={`sms:${contact.phoneTel}`}>Text René</a> : null}
          <Link className="tlink" to="/">Back to home</Link>
        </div>
      </div>
    </section>
  );
}
