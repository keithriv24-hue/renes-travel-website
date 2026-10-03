import React from "react";
import siteConfig from "../data/siteConfig";
import Photo from "../components/Photo";
import PlanTripButton from "../components/PlanTripButton";
import {
  NoteFromRene, HowItWorks, TripsIndex, GroupFeature, Postcards, PartnersStrip, BeforeYouGo, FAQ, LetterBand,
} from "../components/sections";

export default function Home() {
  const { contact } = siteConfig;
  return (
    <>
      <section className="hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="hero-copy">
            <h1 id="hero-title" className="h-display rise">Bring back the <em>memories.</em></h1>
            <p className="sub lede rise-2">
              René Howell plans cruises, resorts, reunions and honeymoons by land, sea, air or rail, from first call to departure day.
            </p>
            <div className="ctas rise-3">
              <PlanTripButton source="hero" />
              <a className="tlink" href={`tel:${contact.phoneTel}`}>Call {contact.phoneDisplay}</a>
            </div>
          </div>
          <div className="hero-media">
            <Photo name="hero" deep priority className="unveil" sizes="(min-width: 960px) 40vw, 100vw" />
            <div className="sign-card" aria-hidden="true">
              <p className="s">René</p>
              <p className="t">René Howell, your travel agent</p>
            </div>
          </div>
        </div>
      </section>
      <NoteFromRene />
      <HowItWorks />
      <TripsIndex />
      <GroupFeature />
      <Postcards />
      <PartnersStrip />
      <BeforeYouGo />
      <FAQ />
      <LetterBand />
    </>
  );
}
