import React from "react";
import { Link } from "react-router";
import siteConfig from "../data/siteConfig";
import { partners, partnerTypes } from "../data/partners";
import Breadcrumbs from "../components/Breadcrumbs";
import PlanTripButton from "../components/PlanTripButton";
import { LetterBand } from "../components/sections";

export default function Partners() {
  const groups = [
    { key: "ocean", label: "Ocean cruises", types: ["ocean"] },
    { key: "river-rail", label: "River cruises and rail", types: ["river", "rail"] },
    { key: "more", label: "Tours, resorts and special trips", types: ["tours", "resorts", "parks", "sports"] },
  ].map((g) => ({ ...g, items: partners.filter((p) => g.types.includes(p.type)) }));
  const { alsoPartneredWith } = siteConfig;
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Partners" }]} />
          <h1 className="h-page rise" style={{ maxWidth: "15ch" }}>Cruise lines and travel partners.</h1>
          <p className="lede rise-2">
            Explore René’s most popular affiliates. Whether it’s by land, sea, air or rail, she wants to give you a world of choices.
          </p>
          <div className="ctas rise-3"><PlanTripButton source="partners-head" /></div>
        </div>
      </header>

      {groups.map((g, i) => (
        <section key={g.key} className={`section ${i % 2 ? "tint" : ""}`} aria-labelledby={`type-${g.key}`}>
          <div className="wrap">
            <h2 id={`type-${g.key}`} className="h-section" style={{ marginBottom: 32 }}>{g.label}</h2>
            <ul className="rows">
              {g.items.map((p) => (
                <li key={p.slug}>
                  <Link to={`/partners/${p.slug}/`}>
                    <span className="n">{p.name}<small>{partnerTypes[p.type]}</small></span>
                    <span className="d">{p.summary.split(". ")[0]}.</span>
                    <span className="go" aria-hidden="true">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section className="section" aria-label="Other partners">
        <div className="wrap">
          <p className="muted" style={{ maxWidth: "62ch" }}>
            René is also partnered with {alsoPartneredWith.slice(0, -1).join(", ")} and {alsoPartneredWith.at(-1)}. Travel insurance is
            available through Travel Guard; see <Link className="inline-link" to="/forms/">Client forms</Link>.
          </p>
        </div>
      </section>

      <LetterBand />
    </>
  );
}
