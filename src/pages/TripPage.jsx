import React from "react";
import { Link, useParams } from "react-router";
import siteConfig from "../data/siteConfig";
import { tripBySlug, trips, whatReneHandles } from "../data/trips";
import { partners } from "../data/partners";
import { tripFaqs } from "../lib/routes";
import Breadcrumbs from "../components/Breadcrumbs";
import Photo from "../components/Photo";
import PlanTripButton from "../components/PlanTripButton";
import { Handles, FAQ, LetterBand, testimonialById } from "../components/sections";
import NotFound from "./NotFound";

export default function TripPage() {
  const { slug } = useParams();
  const trip = tripBySlug(slug);
  if (!trip) return <NotFound />;
  const lines = partners.filter((p) => p.trips.includes(trip.slug));
  const quote = trip.testimonial ? testimonialById(trip.testimonial) : null;
  const related = trips.filter((t) => t.slug !== trip.slug).slice(0, 5);

  const headCopy = (
    <div>
      <h1 className="h-page rise" style={{ maxWidth: "16ch" }}>{trip.h1}</h1>
      {trip.intro.map((p, i) => <p key={i} className={`lede ${i ? "" : "rise-2"}`} style={{ marginTop: i ? 16 : 24 }}>{p}</p>)}
      <div className="ctas rise-3">
        <PlanTripButton source={`trip-${trip.slug}`} />
        <a className="tlink" href={`tel:${siteConfig.contact.phoneTel}`}>Call {siteConfig.contact.phoneDisplay}</a>
      </div>
    </div>
  );

  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Trips", to: "/trips/" }, { label: trip.name }]} />
          {trip.image ? (
            <div className="page-head-split">{headCopy}<Photo name={trip.image} priority sizes="(min-width: 960px) 38vw, 100vw" /></div>
          ) : headCopy}
        </div>
      </header>

      <section className="section" aria-labelledby="handles-title">
        <div className="wrap">
          <h2 id="handles-title" className="h-section" style={{ maxWidth: "20ch" }}>What René handles for your {trip.name.toLowerCase()}.</h2>
          <Handles items={whatReneHandles} />
        </div>
      </section>

      {lines.length ? (
        <section className="section tint" aria-labelledby="lines-title">
          <div className="wrap split">
            <div className="side">
              <h2 id="lines-title" className="h-section">Lines and partners René books.</h2>
            </div>
            <div className="main">
              <div className="chiplinks">
                {lines.map((p) => <Link key={p.slug} to={`/partners/${p.slug}/`}>{p.name}</Link>)}
              </div>
              {quote ? (
                <figure className="quote" style={{ marginTop: 48, maxWidth: "40ch" }}>
                  <blockquote>“{quote.short}”</blockquote>
                  <figcaption><strong>{quote.name}</strong>, {quote.context}</figcaption>
                </figure>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      <FAQ faqs={tripFaqs(trip)} title={`${trip.name}: good to know.`} />

      <section className="section tint" aria-labelledby="related-title">
        <div className="wrap">
          <h2 id="related-title" className="h-card" style={{ marginBottom: 20 }}>More trips René plans</h2>
          <div className="chiplinks">
            {related.map((t) => <Link key={t.slug} to={`/trips/${t.slug}/`}>{t.name}</Link>)}
            <Link to="/group-cruises/">Group cruises</Link>
          </div>
        </div>
      </section>

      <LetterBand />
    </>
  );
}
