import React from "react";
import siteConfig from "../data/siteConfig";
import Photo from "../components/Photo";
import Breadcrumbs from "../components/Breadcrumbs";
import PlanTripButton from "../components/PlanTripButton";
import { TestimonialPicker, LetterBand } from "../components/sections";

export default function About() {
  const { history, vision, credentials, alsoPartneredWith, business, about } = siteConfig;
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "About René" }]} />
          <div className="page-head-split">
            <div>
              <h1 className="h-page rise">About {business.owner}</h1>
              <p className="lede rise-2">{about.intro}</p>
              <div className="ctas rise-3"><PlanTripButton source="about-head" /></div>
            </div>
            <Photo name="portrait" sizes="(min-width: 960px) 38vw, 100vw" />
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="history-title">
        <div className="wrap split">
          <div className="side">
            <h2 id="history-title" className="h-section">{history.heading}</h2>
          </div>
          <div className="main prose">
            {history.paragraphs.map((p, i) => <p key={i} className={i === 0 ? "dropcap" : undefined} style={{ fontSize: "1.2rem" }}>{p}</p>)}
            <blockquote className="pull">“{history.reneQuote}”</blockquote>
            <p className="signature" aria-hidden="true">René</p>
            <p className="muted" style={{ marginTop: 4 }}>{business.owner}, {business.ownerTitle}</p>
            <div className="creds">
              {credentials.map((c) => <div key={c.title}><strong>{c.title}</strong>{c.detail}</div>)}
            </div>
            <p className="muted" style={{ marginTop: 28 }}>
              I also work with {alsoPartneredWith.slice(0, -1).join(", ")} and {alsoPartneredWith.at(-1)}.
            </p>
          </div>
        </div>
      </section>

      <section className="section tint" id="vision" aria-labelledby="vision-title">
        <div className="wrap split">
          <div className="side">
            <h2 id="vision-title" className="h-section">{vision.heading}</h2>
          </div>
          <div className="main prose">
            <p style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.3 }}>{vision.lead}</p>
            {vision.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="words-title">
        <div className="wrap split">
          <div className="side">
            <h2 id="words-title" className="h-section">In their words.</h2>
            <p className="muted" style={{ marginTop: 16 }}>Notes from people who traveled with René.</p>
          </div>
          <div className="main"><TestimonialPicker /></div>
        </div>
      </section>

      <LetterBand />
    </>
  );
}
