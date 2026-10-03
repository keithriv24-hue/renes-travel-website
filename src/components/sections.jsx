import React, { useState } from "react";
import { Link } from "react-router";
import siteConfig from "../data/siteConfig";
import { trips } from "../data/trips";
import { partners } from "../data/partners";
import Photo from "./Photo";
import PlanTripButton from "./PlanTripButton";
import QuoteConsent from "./QuoteConsent";
import GoogleReviews from "./GoogleReviews";

const { business, contact } = siteConfig;
export const testimonialById = (id) => siteConfig.testimonials.find((t) => t.id === id);

/* A note from René (concept A layout, concept C signature) */
export function NoteFromRene({ headingLevel = "h2" }) {
  const H = headingLevel;
  return (
    <section className="note" aria-labelledby="note-title">
      <div className="wrap">
        <p className="label">A note from René</p>
        <div className="note-portrait">
          <Photo name="portrait" sizes="(min-width: 960px) 30vw, 160px" />
          <p className="who"><strong>{business.owner}</strong>{business.ownerTitle}, {business.name}</p>
        </div>
        <div className="note-body">
          <H id="note-title" className="h-section reveal">Started for the love of travel.</H>
          <p className="lede-body dropcap">
            René began as a group leader with Liberty Travel in 2006, booking her first cruise on Royal Caribbean’s Explorer of the
            Seas for 32 people. The same travelers kept sailing with her every two years for the next decade.
          </p>
          <blockquote className="pull">“{siteConfig.history.reneQuote}”</blockquote>
          <p className="signature" aria-hidden="true">René</p>
          <div className="creds">
            {siteConfig.credentials.map((c) => (
              <div key={c.title}><strong>{c.title}</strong>{c.detail}</div>
            ))}
          </div>
          <div className="link-row">
            <Link className="tlink" to="/about/">Read René’s story</Link>
            <Link className="tlink" to="/group-cruises/">Group cruises</Link>
          </div>
        </div>
      </div>
    </section>
  );
}

/* How a trip comes together (concept C). Each step traces to René’s site. */
export function HowItWorks() {
  return (
    <section className="how" aria-labelledby="how-title">
      <div className="wrap">
        <h2 id="how-title" className="h-section reveal" style={{ maxWidth: "18ch" }}>How a trip comes together with René.</h2>
        <ol className="route">
          <li>
            <h3>Tell her the idea</h3>
            <p>Call, text, email or send the short form. A rough idea of where and when is plenty to get the ball rolling.</p>
          </li>
          <li>
            <h3>See options in your budget</h3>
            <p>René finds what you want within the budget you set, with the line or resort that fits.</p>
          </li>
          <li>
            <h3>Book and pay on a schedule</h3>
            <p>Recurring card payments let you spread the cost out, so there is time to pay before you travel.</p>
          </li>
          <li>
            <h3>Pack and go</h3>
            <p>Flights, connections and luggage arranged, and your forms in one place before you leave home.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* Trips index (concept A) */
export function TripsIndex({ title = "Where René can take you.", headingLevel = "h2" }) {
  const H = headingLevel;
  return (
    <section className="trips" id="trips" aria-labelledby="trips-title">
      <div className="wrap">
        <div className="trips-head">
          <H id="trips-title" className="h-section reveal">{title}</H>
          <p>A one-stop agency for the whole trip, from close to home to a far-off corner of the globe.</p>
          <Photo name="river" sizes="(min-width: 960px) 40vw, 100vw" />
          <Link className="tlink" to="/trips/" style={{ marginTop: 20 }}>All trips and services</Link>
        </div>
        <ul className="index">
          {trips.map((t) => (
            <li key={t.slug}>
              <Link to={`/trips/${t.slug}/`}>
                <span className="n">{t.name}</span>
                <span className="d">{t.where}</span>
              </Link>
            </li>
          ))}
          <li>
            <Link to="/group-cruises/">
              <span className="n">Group cruises &amp; reunions</span>
              <span className="d">René’s specialty since 2006</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* Groups feature (concept A) */
export function GroupFeature({ showWide = true, link = true }) {
  return (
    <section className="groups" id="groups" aria-labelledby="groups-title">
      <div className="wrap">
        <p className="big32" aria-hidden="true">32<span>travelers on René’s first group cruise, Royal Caribbean’s Explorer of the Seas, 2006.</span></p>
        <div className="groups-copy">
          <h2 id="groups-title" className="h-section reveal" style={{ maxWidth: "14ch" }}>Group cruises, organized by René.</h2>
          <p>
            Getting a group on the same ship is how René started, and her travelers keep coming back. She books the group and sets up
            a payment schedule, so everyone has time to pay before you sail.
          </p>
          <div className="kinds"><span>Family reunions</span><span>Class reunions</span><span>Retirement cruises</span></div>
          {link ? <div className="link-row"><Link className="tlink" to="/group-cruises/">How group cruises work</Link></div> : null}
        </div>
        {showWide ? (
          <div className="groups-wide"><Photo name="group" /></div>
        ) : null}
      </div>
    </section>
  );
}

/* Postcard testimonials (concept A) */
export function Postcards() {
  const en = testimonialById("eugenia-nigel");
  const others = ["tony-wendy", "felicia"].map(testimonialById);
  return (
    <GoogleReviews>
      <section className="words" aria-labelledby="words-title">
        <div className="wrap">
          <h2 id="words-title" className="h-section reveal" style={{ maxWidth: "20ch" }}>Postcards from René’s travelers.</h2>
          <div className="words-grid">
            <article className="postcard" aria-label={`Testimonial from ${en.name}`}>
              <Photo name="postcard" />
              <div className="back">
                <div className="stamp">Torres Vedras, Portugal</div>
                <p className="msg">“{en.short} Experience it for yourself.”</p>
                <p className="pt" lang="pt">“Foram muito agradáveis os momentos que passamos na Praia de Santa Cruz.”</p>
                <p className="sig">{en.name}<span>Mother and son, visiting her homeland</span></p>
              </div>
            </article>
            <div className="quotes">
              {others.map((t) => (
                <figure className="quote" key={t.id}>
                  <blockquote>“{t.short}”</blockquote>
                  <figcaption><strong>{t.name}</strong>, {t.context}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>
    </GoogleReviews>
  );
}

/* Testimonial picker with full testimonials (concept C) */
export function TestimonialPicker() {
  const [active, setActive] = useState(siteConfig.testimonials[0].id);
  const t = testimonialById(active);
  return (
    <div className="picker">
      <p className="label" style={{ marginBottom: 14 }} id="picker-label">Choose a traveler</p>
      <div className="chips" role="group" aria-labelledby="picker-label">
        {siteConfig.testimonials.map((x) => (
          <button key={x.id} type="button" aria-pressed={x.id === active} onClick={() => setActive(x.id)}>{x.name}</button>
        ))}
      </div>
      <figure className="picked" aria-live="polite">
        <blockquote>“{t.full}”</blockquote>
        {t.fullPt ? <p className="pt" lang="pt">“{t.fullPt}”</p> : null}
        <figcaption><strong>{t.name}</strong>, {t.context}</figcaption>
      </figure>
    </div>
  );
}

/* Partner names strip (concept A) */
export function PartnersStrip() {
  return (
    <section className="partners-strip" aria-labelledby="partners-title">
      <div className="wrap">
        <p className="label" style={{ color: "var(--color-blue)" }}>Cruise lines and travel partners</p>
        <h2 id="partners-title" className="h-section reveal" style={{ marginTop: 16, maxWidth: "18ch" }}>Booked with the lines you know.</h2>
        <ul className="plist">
          {partners.map((p) => (
            <li key={p.slug}><Link to={`/partners/${p.slug}/`}>{p.short}</Link></li>
          ))}
        </ul>
        <p className="muted" style={{ marginTop: 40, maxWidth: "60ch" }}>
          Whether you want to relax or celebrate, René books the line that fits the trip.{" "}
          <Link className="inline-link" to="/partners/">See every partner</Link>
        </p>
      </div>
    </section>
  );
}

/* Forms folder (concept C, in deep blue) */
export function FormsFolder() {
  return (
    <div className="folder">
      <span className="tab">Client forms</span>
      <div className="body">
        {siteConfig.forms.map((g) => (
          <div className="group" key={g.group}>
            <h3>{g.group}</h3>
            <ul>
              {g.items.map((f) => (
                <li key={f.href}>
                  <a href={f.href} target="_blank" rel="noopener noreferrer">
                    {f.label} <span>{f.kind}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Interactive safe travel checklist (concept C) */
export function Checklist({ idPrefix = "chk" }) {
  return (
    <div className="check">
      <h3>Before you go</h3>
      <p>René’s safe travel checklist.</p>
      <ul>
        {siteConfig.checklist.map((item, i) => (
          <li key={item}>
            <label htmlFor={`${idPrefix}-${i}`}>
              <input type="checkbox" id={`${idPrefix}-${i}`} />
              <span>{item}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BeforeYouGo() {
  return (
    <section className="before" id="before" aria-labelledby="before-title">
      <div className="wrap">
        <div className="before-head">
          <h2 id="before-title" className="h-section reveal">Your trip paperwork, in one folder.</h2>
          <p>Already booked? Download what René needs from you, and check off the basics before you leave.</p>
        </div>
        <FormsFolder />
        <Checklist idPrefix="home-chk" />
      </div>
    </section>
  );
}

/* FAQ, answers always in the DOM for search engines (Haul Yeah pattern) */
export function FAQ({ faqs = siteConfig.faqs, title = "Questions René hears often." }) {
  return (
    <section className="faq" aria-labelledby="faq-title">
      <div className="wrap">
        <div className="faq-head">
          <h2 id="faq-title" className="h-section reveal">{title}</h2>
          <p className="muted" style={{ marginTop: 18 }}>
            Something else? Call or text <a className="inline-link" href={`tel:${contact.phoneTel}`}>{contact.phoneDisplay}</a>.
          </p>
        </div>
        <div className="faq-list">
          {faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Closing contact band: concept C’s “Dear René,” letter in deep blue */
export function LetterBand({ title = "Ready to start planning your getaway?" }) {
  return (
    <section className="letter-band" aria-labelledby="letter-title">
      <div className="wrap">
        <div className="letter-copy">
          <h2 id="letter-title" className="h-section">{title}</h2>
          <p>{siteConfig.contactNote.body} {siteConfig.contactNote.signoff}</p>
          <p className="signature" aria-hidden="true">René</p>
          <div className="reach">
            <a href={`tel:${contact.phoneTel}`}><small>Call or text</small><span>{contact.phoneDisplay}</span></a>
            <a href={`mailto:${contact.email}`}><small>Email</small><span>{contact.email}</span></a>
          </div>
        </div>
        <div className="letter">
          <p className="dear">Dear René,</p>
          <p>Where would you like to go, when, and who is coming? Send René a short note through the trip form. A rough idea is plenty.</p>
          <div className="actions">
            <PlanTripButton source="letter-band" />
            {contact.acceptsTexts ? <a className="btn btn-ghost" href={`sms:${contact.phoneTel}`}>Text René</a> : null}
          </div>
          <QuoteConsent />
        </div>
      </div>
    </section>
  );
}

/* What René handles on every trip (trip and group pages) */
export function Handles({ items }) {
  return (
    <ul className="handles">
      {items.map((h) => (
        <li key={h.title}><strong>{h.title}</strong><span>{h.detail}</span></li>
      ))}
    </ul>
  );
}
