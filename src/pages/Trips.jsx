import React from "react";
import { Link } from "react-router";
import siteConfig from "../data/siteConfig";
import { trips, whatReneHandles } from "../data/trips";
import Breadcrumbs from "../components/Breadcrumbs";
import PlanTripButton from "../components/PlanTripButton";
import { Handles, LetterBand } from "../components/sections";

export default function Trips() {
  const [p1, p2, p3] = siteConfig.services.paragraphs;
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Trips" }]} />
          <h1 className="h-page rise" style={{ maxWidth: "14ch" }}>Trips René plans.</h1>
          <p className="lede rise-2">{p1}</p>
          <div className="ctas rise-3">
            <PlanTripButton source="trips-head" />
            <a className="tlink" href={`tel:${siteConfig.contact.phoneTel}`}>Call {siteConfig.contact.phoneDisplay}</a>
          </div>
        </div>
      </header>

      <section className="section" aria-labelledby="all-trips">
        <div className="wrap">
          <h2 id="all-trips" className="h-section" style={{ marginBottom: 40 }}>Choose a kind of trip.</h2>
          <div className="cards">
            <Link to="/group-cruises/">
              <span className="k">René’s specialty</span>
              <span className="n">Group cruises &amp; reunions</span>
              <span className="d">Family reunions, class reunions and retirement cruises, organized by a group leader since 2006.</span>
              <span className="go">See group cruises →</span>
            </Link>
            {trips.map((t) => (
              <Link key={t.slug} to={`/trips/${t.slug}/`}>
                <span className="k">{t.where}</span>
                <span className="n">{t.name}</span>
                <span className="d">{t.intro[0]}</span>
                <span className="go">Details →</span>
              </Link>
            ))}
            <Link to="/plan-my-trip/">
              <span className="k">Not sure yet?</span>
              <span className="n">Start with an idea</span>
              <span className="d">Tell René roughly where and when. She will come back with options that fit your budget.</span>
              <span className="go">Plan my trip →</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section tint" aria-labelledby="handles-title">
        <div className="wrap">
          <h2 id="handles-title" className="h-section" style={{ maxWidth: "18ch" }}>What René handles on every trip.</h2>
          <div className="prose" style={{ marginTop: 24 }}><p>{p2}</p><p>{p3}</p></div>
          <Handles items={whatReneHandles} />
        </div>
      </section>

      <LetterBand />
    </>
  );
}
