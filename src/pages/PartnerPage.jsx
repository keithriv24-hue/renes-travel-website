import React from "react";
import { Link, useParams } from "react-router";
import siteConfig from "../data/siteConfig";
import { partnerBySlug, partners, partnerTypes } from "../data/partners";
import { trips } from "../data/trips";
import Breadcrumbs from "../components/Breadcrumbs";
import PlanTripButton from "../components/PlanTripButton";
import { LetterBand, testimonialById } from "../components/sections";
import Photo from "../components/Photo";
import NotFound from "./NotFound";

export default function PartnerPage() {
  const { slug } = useParams();
  const p = partnerBySlug(slug);
  if (!p) return <NotFound />;
  const tripList = trips.filter((t) => p.trips.includes(t.slug));
  const sameType = partners.filter((x) => x.type === p.type && x.slug !== p.slug);
  const quote = p.testimonial ? testimonialById(p.testimonial) : null;
  const shipPhoto = { "royal-caribbean": "hero", "amawaterways": "river" }[p.slug];
  const host = p.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Partners", to: "/partners/" }, { label: p.name }]} />
          <p className="label" style={{ color: "var(--color-blue)", marginBottom: 16 }}>{partnerTypes[p.type]}</p>
          <h1 className="h-page rise" style={{ maxWidth: "16ch" }}>{p.name}</h1>
          <p className="lede rise-2">{p.summary}</p>
          <div className="ctas rise-3">
            <PlanTripButton source={`partner-${p.slug}`}>Ask René about {p.short}</PlanTripButton>
            <a className="tlink" href={p.website} target="_blank" rel="noopener noreferrer">Visit {host}</a>
          </div>
        </div>
      </header>

      {shipPhoto ? <section className="section tint" aria-label={`${p.short} ship photograph`}><div className="wrap"><Photo name={shipPhoto} className="partner-ship" /></div></section> : null}

      <section className="section" aria-labelledby="know-title">
        <div className="wrap split">
          <div className="side">
            <h2 id="know-title" className="h-section">Good to know.</h2>
          </div>
          <div className="main">
            <ul className="handles" style={{ marginTop: 0, gridTemplateColumns: "minmax(0, 1fr)" }}>
              {p.highlights.map((h) => <li key={h}><span style={{ marginTop: 0, color: "var(--color-ink)", fontSize: "1.1rem" }}>{h}</span></li>)}
            </ul>
            {quote ? (
              <figure className="quote" style={{ marginTop: 40, maxWidth: "40ch" }}>
                <blockquote>“{quote.short}”</blockquote>
                <figcaption><strong>{quote.name}</strong>, {quote.context}</figcaption>
              </figure>
            ) : null}
            {p.brochures?.length ? (
              <div style={{ marginTop: 40 }}>
                <h3 className="h-card" style={{ marginBottom: 12 }}>Brochures</h3>
                <ul className="brochures">
                  {p.brochures.map((b) => (
                    <li key={b.href}><a href={b.href} target="_blank" rel="noopener noreferrer">{b.label} <span>PDF</span></a></li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section tint" aria-labelledby="trips-with">
        <div className="wrap split">
          <div className="side">
            <h2 id="trips-with" className="h-card">Trips with {p.short}</h2>
            <div className="chiplinks" style={{ marginTop: 16 }}>
              {tripList.map((t) => <Link key={t.slug} to={`/trips/${t.slug}/`}>{t.name}</Link>)}
            </div>
          </div>
          {sameType.length ? (
            <div className="main">
              <h2 className="h-card">More {partnerTypes[p.type].toLowerCase()}</h2>
              <div className="chiplinks" style={{ marginTop: 16 }}>
                {sameType.map((x) => <Link key={x.slug} to={`/partners/${x.slug}/`}>{x.short}</Link>)}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <LetterBand title={`Planning a trip with ${p.short}?`} />
    </>
  );
}
