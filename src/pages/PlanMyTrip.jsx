import React from "react";
import siteConfig from "../data/siteConfig";
import Breadcrumbs from "../components/Breadcrumbs";
import QuoteEmbed from "../components/QuoteEmbed";

export default function PlanMyTrip() {
  const { contact, contactNote } = siteConfig;
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Plan my trip" }]} />
          <h1 className="h-page rise">Plan my trip.</h1>
          <p className="lede rise-2">Tell René where you would like to go. A rough idea of where, when and who is coming is plenty.</p>
        </div>
      </header>
      <section className="section" aria-label="Trip form and contact details">
        <div className="wrap split">
          <div className="side">
            <h2 className="h-card">{contactNote.heading}</h2>
            <p className="muted" style={{ marginTop: 16 }}>{contactNote.body}</p>
            <p style={{ marginTop: 16 }}>{contactNote.signoff}</p>
            <p className="signature" aria-hidden="true">René</p>
            <div className="reach" style={{ color: "var(--color-ink)" }}>
              <a href={`tel:${contact.phoneTel}`}><small style={{ color: "var(--color-ink-2)" }}>Call</small><span>{contact.phoneDisplay}</span></a>
              {contact.acceptsTexts ? (
                <a href={`sms:${contact.phoneTel}`}><small style={{ color: "var(--color-ink-2)" }}>Text</small><span>{contact.phoneDisplay}</span></a>
              ) : null}
              <a href={`mailto:${contact.email}`}><small style={{ color: "var(--color-ink-2)" }}>Email</small><span>{contact.email}</span></a>
            </div>
          </div>
          <div className="main"><QuoteEmbed /></div>
        </div>
      </section>
    </>
  );
}
