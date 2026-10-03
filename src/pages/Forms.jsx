import React from "react";
import siteConfig from "../data/siteConfig";
import Breadcrumbs from "../components/Breadcrumbs";
import { FormsFolder, Checklist, LetterBand } from "../components/sections";

export default function Forms() {
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Client forms" }]} />
          <h1 className="h-page rise" style={{ maxWidth: "14ch" }}>Client forms.</h1>
          <p className="lede rise-2">Already booked? Download what René needs from you, and check off the basics before you leave.</p>
        </div>
      </header>

      <section className="before" aria-label="Forms and checklist">
        <div className="wrap">
          <FormsFolder />
          <Checklist idPrefix="forms-chk" />
        </div>
      </section>

      <section className="section tint" aria-labelledby="tips-title">
        <div className="wrap split">
          <div className="side">
            <h2 id="tips-title" className="h-section">Safe travel tips.</h2>
            <p className="muted" style={{ marginTop: 16 }}>René’s advice for staying safe while you enjoy yourself, especially at sea.</p>
          </div>
          <ol className="main handles" style={{ marginTop: 0, gridTemplateColumns: "minmax(0, 1fr)" }}>
            {siteConfig.safeTravelTips.map((t, i) => (
              <li key={i}>
                <strong>{["Stay aware", "Trust your gut", "Leave the valuables home"][i]}</strong>
                <span>{t}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <LetterBand title="Questions about a form?" />
    </>
  );
}
