import React from "react";
import { Link } from "react-router";
import siteConfig from "../data/siteConfig";
import { trips } from "../data/trips";

export default function Footer() {
  const { business, contact, socialProfiles } = siteConfig;
  return (
    <footer>
      <div className="foot-main">
        <div className="wrap">
          <div className="foot-brand">
            <p className="r">René’s Travel Agency</p>
            <p>{business.tagline} Personal travel planning by {business.owner}, {business.state}.</p>
          </div>
          <div className="foot-col">
            <h2>Trips</h2>
            <ul>
              {trips.slice(0, 6).map((t) => (
                <li key={t.slug}><Link to={`/trips/${t.slug}/`}>{t.name}</Link></li>
              ))}
              <li><Link to="/trips/">All trips</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h2>Agency</h2>
            <ul>
              <li><Link to="/about/">About René</Link></li>
              <li><Link to="/group-cruises/">Group cruises</Link></li>
              <li><Link to="/partners/">Partners</Link></li>
              <li><Link to="/forms/">Client forms</Link></li>
              <li><Link to="/privacy-policy/">Privacy policy</Link></li>
            </ul>
          </div>
          <div className="foot-col">
            <h2>Contact</h2>
            <ul>
              <li><a href={`tel:${contact.phoneTel}`}>Call {contact.phoneDisplay}</a></li>
              {contact.acceptsTexts ? <li><a href={`sms:${contact.phoneTel}`}>Text René</a></li> : null}
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={socialProfiles.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><Link to="/plan-my-trip/">Plan my trip</Link></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="legal">
        <div className="wrap">
          <span>© <span suppressHydrationWarning>{new Date().getFullYear()}</span> {business.name}. All rights reserved.</span>
          <span>Member, Cruise Lines International Association (CLIA)</span>
        </div>
      </div>
    </footer>
  );
}
